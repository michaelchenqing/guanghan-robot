<template>
  <div class="order">
    <div class="liucheng">
      <el-row :gutter="20">
        <el-steps :active="active" align-center finish-status="success">
          <el-step title="选择科室"></el-step>
          <el-step title="选择医生"></el-step>
          <el-step title="确认挂号"></el-step>
          <el-step title="订单支付"></el-step>
        </el-steps>
      </el-row>
    </div>
    <div  class="order-form">
      <el-row style="margin-top: 0.5em;">
        <el-col :span="12"><div class="grid-content bg-purple">就诊科室：</div></el-col>
        <el-col :span="12"><div class="grid-content bg-purple-light">{{ksmc}}</div></el-col>
      </el-row>
      <el-row style="margin-top: 0.5em; ">
        <el-col :span="12"><div class="grid-content bg-purple">看诊医生：</div></el-col>
        <el-col :span="12"><div class="grid-content bg-purple-light">{{ysxm}}</div></el-col>
      </el-row>
      <el-row  style="margin-top: 0.5em;">
        <el-col :span="12"><div class="grid-content bg-purple">看诊时间：</div></el-col>
        <el-col :span="12"><div class="grid-content bg-purple-light">{{bbmc}}</div></el-col>
      </el-row>
      <el-row style="margin-top: 0.5em;">
        <el-col :span="12"><div class="grid-content bg-purple">挂号费用：</div></el-col>
        <el-col :span="12"><div class="grid-content bg-purple-light">￥{{zfje}}</div></el-col>
      </el-row>
    </div>
    <div class="order-submit">
      <el-button type="success" @click="payOrder(3)">扫码付款</el-button>
      <el-button  @click="reset()">重选医生</el-button>
    </div>
    <el-dialog
      width="480px"
      top="120px"
      :visible.sync="payDialog"
      :before-close="handleClose">
      <div v-bind:class="['zhifu', 'huizhifu']">
        <div class="zhifubao-code"><img :src="payCode" width="216" height="216" /></div>
        <div class="zhifubao-jine">挂号费：￥{{zfje}}</div>
      </div>
    </el-dialog>

  </div>  
</template>
<script>
import { WSC } from "@/api/client";
export default {
  name: 'RegOrder',
  data() {
      return {
        WSC,
        active: 2,
        userinfo: {},
        ysbh: '',
        bb: '',
        zfje: '',
        ksmc: '',
        ysxm:'',
        bbmc: '',
        message: this.$message,
        payDialog: false,
        payCode: '',
        payType: 1,
      }
    },
    watch: {
        WSC:{
            handler:function(obj) {
                if (obj.result == 1) {
                    this.payDialog = false,
                    WSC.result = false
                    this.$router.push({ path: '/register/reg-result', query: { status: 1, ksmc: this.ksmc, ysxm: this.ysxm } })
                } else if (obj.result == 2) {
                  this.payDialog = false,
                  WSC.result = false
                  this.$router.push({ path: '/register/reg-result', query: { status: 0, ksmc: this.ksmc, ysxm: this.ysxm } })
                }
            },
            deep:true
        },
    },
    created: function () {
      if (!WSC.token) {
        this.$router.push({ path: '/' })
      }
      this.ysbh = this.$route.query.ysbh;
      this.bb = this.$route.query.bb;
      this.zfje = this.$route.query.zfje;
      this.ksmc = this.$route.query.ksmc;
      this.ysxm = this.$route.query.ysxm;
      this.bbmc = this.$route.query.bbmc;
  },
  mounted: function() {},
  computed: {},
    methods: {
      reset() {
        this.$router.go(-1);
      },
      handleClose(done) {
        this.$confirm('如果已经支付请等待系统通知...')
          .then(_ => {
            done();
          })
          .catch(_ => {});
      },
      payOrder(zfzl) {
        this.payCode = ''
        this.payType = zfzl
        this.payDialog = true
        const params = {
            'ysbh': this.ysbh,
            'ysxm': this.ysxm,
            'bb': this.bb,
            'bbmc': this.bbmc,
            'ksmc': this.ksmc,
            'zfje': this.zfje,
            'zfzl': zfzl
        }
        console.log(params);
        WSC.websocketsend(params, 'Register', 'createRegOrder').then(result => {
            if (result.code === 0) {
              this.active = 3
              this.payCode = result.data
            } else {
                this.message.error("接口异常，请重试");
            }
        }).catch(err => {
            this.message.error(err.message);
        });
      },
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.order {
  width: 100%;
  margin: 2em auto;
}
.order-form {
  width: 50vm;
  margin: 1em auto;  
  font-size: 2em;
}
.bg-purple {
  text-align: right;
}
.bg-purple-light {
  text-align: left;
}
.order-submit {
  text-align: center;
}
.zhifu {
  width:480px; height: 576px;
}
.zhifubao {
  background:url(../../../static/img/zhifubao.png) no-repeat center;
}
.weixin {
  background:url(../../../static/img/weixin.png) no-repeat center;
}
.huizhifu {
  background:url(../../../static/img/WechatIMG22.png) no-repeat center;
}
.zhifubao-jine {
    font-size: 1em; color: #333;  height: 1.5em; 
    margin-top: 1em; padding-left: 112px;
}
.zhifubao-code {
  width: 216px;
  height: 216px;
  padding-top: 212px; margin-left: 46px;
}
</style>
<style>
.liucheng .el-step .el-step__title{
  font-size: 1.5em;
}
.order-submit .el-button {
    font-size: 1.5em;
}
.el-message-box__message {
  font-size: 1.5em;
}
.el-button {
  font-size: 1em;
}
.el-dialog__body {
  padding: 0;
}
.el-dialog__header {
  padding: 0; 
}
</style>