<template>
  <div class="payment">
    <template>
      <el-table
        v-loading="loading"
        :data="tableData"
        header-cell-class-name="pay-header-cell"
        cell-class-name="pay-cell"
        style="width: 100%">
        <el-table-column type="expand">
        <template slot-scope="props">
            <el-form label-position="left" inline class="demo-table-expand">
                <template v-for="site in props.row.fymxdata">
                  <el-form-item style="width:40%" label="项目名称：">
                      <span>({{ site.xmbm }}) {{ site.xmmc }}</span>
                  </el-form-item>
                  <el-form-item label="单价：">
                      <span>{{ site.dj }}</span>
                  </el-form-item>
                  <el-form-item label="数量：">
                      <span>{{ site.sl }}（{{ site.dw }}）</span>
                  </el-form-item>
                  <el-form-item label="金额：">
                      <span>{{ site.yhhje }}</span>
                  </el-form-item>
                </template>
            </el-form>
        </template>
        </el-table-column>
        <el-table-column
        label="门诊号"
        prop="mzh">
        </el-table-column>
        <el-table-column
        label="就诊人"
        prop="byxm">
        </el-table-column>
        <el-table-column
        label="开单医生"
        prop="ysxm">
        </el-table-column>
        <el-table-column
        label="开单日期"
        prop="ghrq">
        </el-table-column>
        <el-table-column
        label="总金额"
        prop="money">
        </el-table-column>
        <el-table-column label="支付通道">
          <template slot-scope="scope">
            <template v-if="scope.row.skbs">
              <!-- <el-button type="danger" @click="refund(scope.row.sjh, scope.row.skbs, scope.row.je)" :disabled="disabled">退款</el-button> -->
              已缴费
            </template>
            <template v-else>
              <el-button type="primary" @click="payment(scope.row.mzh, scope.row.je, 1)">支付宝</el-button>
              <el-button type="success" @click="payment(scope.row.mzh, scope.row.je, 2)">微信</el-button>
            </template>
          </template>
        </el-table-column>
      </el-table>
    </template>
    <el-dialog
      width="480px"
      top="0"
      :visible.sync="payDialog"
      :before-close="handleClose">
      <div v-bind:class="['zhifu' ,payType == 1 ? 'zhifubao' : 'weixin']">
        <div class="zhifubao-info">扫码后请等待系统通知</div>
        <div class="zhifubao-jine">门诊缴费：￥{{ money }}</div>
        <div class="zhifubao-code"><img :src="payCode" width="180" height="180" /></div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { WSC } from "@/api/client";
export default {
  name: 'Payment',
  data () {
    return {
      WSC,
      loading: true,
      tableData: [],
      message: this.$message,
      payDialog: false,
      payCode: '',
      payType: 1,
      money : 0.00,
      disabled: false
    }
  },
  watch: {
        WSC:{
            handler:function(obj) {
                if (obj.result == 1) {
                    this.payDialog = false,
                    WSC.result = false
                    // this.message({
                    //     message: '缴费成功',
                    //     type: 'success'
                    // });
                    // setTimeout(()=>{
                    //   this.$router.push({ path: '/index' })
                    // },3000);
                    this.$router.push({ path: '/pay-result', query: { status: 1 } })
                } else if (obj.result == 2) {
                  this.payDialog = false,
                  WSC.result = false
                  // this.message({
                  //       message: '缴费失败',
                  //       type: 'error'
                  // });
                  // setTimeout(()=>{
                  //     this.$router.push({ path: '/index' })
                  //   },3000);
                  this.$router.push({ path: '/pay-result', query: { status: 0 } })
                }
            },
            deep:true
        },
    },
  created: function () {
    if (!WSC.token) {
        this.$router.push({ path: '/' })
    } else {
        const params = {
            'module': 'Robot',
            'method': 'getPayment'
        }
        WSC.websocketsend(params).then(result => {
            this.loading= false
            if (result.code === 0 && result.data.length > 0) {
                this.tableData = result.data
            }
        }).catch(err => {
            this.loading= false
            this.message.error(err.message);
        });
    }
  },
  methods: {
      refund: function(sjh, skbs, zfje) {
        if (sjh == null) {
          this.message.warn('非终端机缴费，请到柜台退款');
        } else {
          this.disabled = true
          this.$confirm('选择退款, 是否继续?', '', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            const params = {
              'module': 'Robot',
              'method': 'cancelPay',
              'arguments': {'sjh': sjh, 'skbs': skbs, 'zfje': zfje}
            }
            WSC.websocketsend(params).then(result => {
                if (result.code === 0) {
                    this.message.success('该缴费已取消，退款稍后到账')
                    setTimeout(()=>{
                        this.disabled = false
                        this.$router.push({ path: '/index'})
                    },3000);
                } else {
                    this.disabled = false
                    this.message.error('操作失败，请重试')
                }
            }).catch(err => {
                this.disabled = false
                this.message.error(err.message);
            });
          }).catch(() => {
            this.disabled = false
            this.$message({
              type: 'info',
              message: '已取消退款'
            });          
          });
        }
      },
      handleClose(done) {
        this.$confirm('如果已经支付请等待系统通知...')
          .then(_ => {
            done();
          })
          .catch(_ => {});
      },
      payment(mzh, zfje, zfzl) {
        this.payCode = ''
        this.payDialog = true
        this.payType = zfzl
        this.money = zfje
        const params = {
          'module': 'Robot',
          'method': 'createPayOrder',
          'arguments': {
            'mzh': mzh,
            'zfje': zfje,
            'zfzl': zfzl,
           }
        }
        WSC.websocketsend(params).then(result => {
            if (result.code === 0) {
              this.payCode = result.data
            } else {
              this.message.error("缴费失败，请重试");
            }
        }).catch(err => {
            this.message.error(err.message);
        });
      },
  }
}
</script>

<style scoped>
  .payment {
      width: 100%;
      
  }
  .demo-table-expand {
    font-size: 0;
  }
  .demo-table-expand label {
    width: 90px;
    color: #99a9bf;
    
  }
  .demo-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 20%;
    font-size: 0.5em;
  }
  .zhifu {
    width:480px; height: 680px;
  }
  .zhifubao {
    background:url(../../static/img/zhifubao.png) no-repeat center;
  }
  .weixin {
    background:url(../../static/img/weixin.png) no-repeat center;
  }
  .zhifubao-info {
    text-align: center; padding-top: 160px; height: 2em;
    font-size: 1.5em; color: #333;
  }
  .zhifubao-jine {
    font-size: 1.5em; color: #FFF;  height: 2em; text-align: center;
    margin-top: 1em;
  }
  .zhifubao-code {
    width: 180px;
    height: 180px;
    padding-top: 42px; margin-left: 150px;
  }
</style>
<style>
.pay-header-cell .cell {
    line-height: 2em;
    height: 2em;
    font-size: 2em;
    text-align: center      
}
.pay-cell .cell {
    line-height: 2em;
    height: 2em;
    font-size: 2em;
    text-align: center    
}
.pay-cell .cell .el-button {
    font-size: 0.5em;
}
</style>
<style>
.el-dialog__body {
  padding: 0;
}
.el-message-box__message {
  font-size: 1.5em;
}
.el-button {
  font-size: 1em;
}
</style>