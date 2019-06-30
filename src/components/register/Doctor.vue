<template>
  <div class="doctor">
    <div class="liucheng">
      <el-row :gutter="20">
        <el-steps :active="1" finish-status="success" align-center>
          <el-step title="选择科室"></el-step>
          <el-step title="选择医生"></el-step>
          <el-step title="确认挂号"></el-step>
          <el-step title="订单支付"></el-step>
        </el-steps>
      </el-row>
    </div>
    <div class="doctor-list">
      <el-row :gutter="20">
        <template>
          <el-table
            :data="tableData"
            v-loading="loading"
            cell-class-name="doctor-list-cell"
            style="width: 100%">
            <el-table-column
              label=""
              width="140">
              <template slot-scope="scope">
                <span class="doctor-photo">
                  <img :src="scope.row.photoUrl" width="120px" height="160px" />
                </span>
              </template>
            </el-table-column>
            <el-table-column
              label=""
              width="220">
              <template slot-scope="scope">
                <div class="doctor-title">
                <el-popover trigger="click" placement="top">
                  <p>简介: {{ scope.row.ysbh || "暂无" }}</p>
                  <div slot="reference" class="name-wrapper">
                    <div class="doctor-title-name">{{ scope.row.xm }}</div>
                    <div class="doctor-title-rank">{{ scope.row.lbmc }}</div>
                  </div>
                </el-popover>
                </div>
              </template>
            </el-table-column>
            <el-table-column label="">
              <template slot-scope="scope">
                <el-button plain>{{ scope.row.bbmc }}</el-button>
              </template>
            </el-table-column>
            <el-table-column label="">
              <template slot-scope="scope">
                <div class="doctor-list-cell-txt">剩余：{{ scope.row.syhs }}</div>
              </template>
            </el-table-column>
            <el-table-column label="">
              <template slot-scope="scope">
                <div class="doctor-list-cell-txt">￥{{ scope.row.ghfy }}</div>
              </template>
            </el-table-column>
            <el-table-column label="">
              <template slot-scope="scope">
                <el-button type="primary" round @click="guahao(scope.row.ysbh, scope.row.bb, scope.row.ghfy, scope.row.syhs, scope.row.xm, scope.row.bbmc )">立即挂号</el-button>
              </template>
            </el-table-column>
          </el-table>
        </template>
      </el-row>
    </div>
    <div class="mfooter">
      <el-button type="primary" @click="addReg">重选科室</el-button>
    </div>
  </div>  
</template>
<script>
import { WSC } from "@/api/client";
export default {
  name: 'Doctor',
  data () {
    return {
      WSC,
      tableData: [],
      loading: true,
      ksbm: '',
      ksmc: '',
      message: this.$message
    }
  },
  created: function () {
    if (!WSC.token) {
      this.$router.push({ path: '/' })
    }
    this.ksmc = this.$route.query.ksmc;
    this.ksbm = this.$route.query.ksbm;
    const params = {
          'ksbm': this.ksbm
      }

      WSC.websocketsend(params, 'Register', 'getSourceList').then(result => {
          this.loading = false
          if (result.code === 0 && result.data.length > 0) {
            this.tableData = result.data
          } else {
              this.message.error("该科室已无号源");
          }
      }).catch(err => {
          this.loading = false
          this.message.error(err.message);
      });
  },
  mounted: function() {},
  computed: {},
  methods: {
      guahao(ysbh, bb, zfje, syhs, ysxm, bbmc) {
        if (syhs > 0) {
          this.$router.push({ path: '/register/reg-order', query: { 
            ysbh: ysbh, bb: bb, zfje:zfje, ksmc: this.ksmc, ysxm: ysxm, bbmc: bbmc
          }})
        } else {
          this.message.error("已经不能挂号该医生");
        }
      },
      addReg: function() {
        this.$router.push({ path: '/register/depart'})
      }
  }
  
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.doctor {
  width: 100%;
  margin: 2em auto;
}
.doctor-list {
  margin-top: 2em;
}
.doctor-photo {
  text-align: center;
}
.doctor-title {
  text-align: left;
  
}
.doctor-title-name {
  font-size: 2.5em;
  line-height: 2.5em;
  color: #303133;
}
.doctor-title-rank {
  font-size: 1.5em;
  color: #606266;
}
.doctor-list-cell-txt {
  font-size: 1.5em;
}
.mfooter {
    text-align: center;
    margin-top: 1.5em;
}
</style>
<style>
.liucheng .el-step .el-step__title{
  font-size: 2em;
}
.doctor-list-cell .cell {
  text-align: center;
  line-height:1.5em;
}
.doctor-list-cell .cell .el-button, .mfooter .el-button {
    font-size: 1.5em;
    
}
</style>     