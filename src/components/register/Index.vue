<template>
    <div class="bodyer">
        <div class="mainer">
            <template>
            <el-table
                :data="tableData"
                v-loading="loading"
                header-cell-class-name="reg-header-cell"
                cell-class-name="reg-cell"
                stripe
                style="width: 100%,line-height: 3em">
                <el-table-column
                prop="ghrq"
                label="日期">
                </el-table-column>
                <el-table-column
                prop="mzh"
                label="门诊号">
                </el-table-column>
                <el-table-column
                prop="ysxm"
                label="应诊医生">
                </el-table-column>
                <el-table-column
                prop="byxm"
                label="就诊人">
                </el-table-column>
                <el-table-column
                prop="hj"
                label="挂号费">
                </el-table-column>
                <!-- <el-table-column label="操作">
                    <template slot-scope="scope">
                        <el-button
                        type="danger"
                        @click="cancelReg(scope.row.mzh)" :disabled="disabled">取消挂号</el-button>
                    </template>
                </el-table-column> -->
            </el-table>
            </template>
        </div>
        <div class="mfooter">
            <el-button type="primary" @click="addReg">继续挂号</el-button>
        </div>
    </div>
</template>
<script>
import { WSC } from "@/api/client";
export default {
  name: 'RegService',
  data () {
    return {
      WSC,
      loading: true,
      tableData: [],
      message: this.$message,
      disabled: false
    }
  },
  created: function () {
    if (!WSC.token) {
        this.$router.push({ path: '/' })
    } else {
        const params = {
            'module': 'Robot',
            'method': 'getTodayRegister'
        }
        WSC.websocketsend(params).then(result => {
            this.loading= false
            if (result.code === 0 && result.data.length > 0) {
                this.tableData = result.data
            } else {
                this.$router.push({ path: '/register/depart'})
            }
        }).catch(err => {
            this.loading= false
            this.message.error(err.message);
        });
    }
  },
  mounted: function() {},
  computed: {},
  methods: {
      cancelReg: function(mzh) {
        this.disabled = true
        const params = {
          'module': 'Robot',
          'method': 'cancelReg',
          'arguments': {'mzh': mzh}
        }
        WSC.websocketsend(params).then(result => {
            if (result.code === 0) {
                this.tableData = result.data
                this.message.success('该挂号已取消，挂号费稍后到账')
                setTimeout(()=>{
                    this.disabled = false
                    this.$router.push({ path: '/index'})
                },3000);
            } else {
                this.disabled = false
                this.message.error('操作失败，请重试')
            }
        }).catch(err => {
            this.message.error(err.message);
        });
      },
      addReg: function() {
        this.$router.push({ path: '/register/depart'})
      }
  }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.bodyer {
    width: 100%;
}
.mfooter {
    text-align: center;
    margin-top: 2em;
}
</style>
<style>
.reg-header-cell .cell {
    line-height: 2em;
    height: 2em;
    font-size: 2em;
    text-align: center      
}
.reg-cell .cell {
    line-height: 2em;
    height: 2em;
    font-size: 2em;
    text-align: center    
}
.reg-cell .cell .el-button {
    font-size: 1em;
}
.mfooter .el-button {
    font-size: 2em;
}
</style>