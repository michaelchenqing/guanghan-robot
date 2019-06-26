<template>
  <div class="reg-result">
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
    <h1 v-if="status==1">挂号成功，请到 {{ office }} {{ doctor }} 医生处就诊</h1>
    <h1 v-else>挂号支付失败，请重试</h1>
  </div>  
</template>
<script>
import { WSC } from "@/api/client";
export default {
  name: 'reg-result',
  data () {
    return {
      WSC,
      status: 0,
      office : '',
      doctor: '',
      active: 3
    }
  }, 
  created: function () {
      if (!WSC.token) {
        this.$router.push({ path: '/' })
      }
      this.status = this.$route.query.status;
      this.office = this.$route.query.ksmc;
      this.doctor = this.$route.query.ysxm;
      if (this.status == 1) {
        this.active = 4
      }
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.reg-result {
    width: 100%;
    margin: 2em auto;
    text-align: center;
}
.reg-result h1 {
  font-size: 2em;
  margin-top: 4em;
}
</style>
<style>
.liucheng .el-step .el-step__title{
  font-size: 1.5em;
}
</style>