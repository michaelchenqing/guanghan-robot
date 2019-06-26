<template>
  <div class="pay-result">
    <h1 v-if="status==1">门诊缴费支付成功</h1>
    <h1 v-else>门诊缴费支付失败，请重试</h1>
  </div>  
</template>
<script>
import { WSC } from "@/api/client";
export default {
  name: 'pay-result',
  data () {
    return {
      WSC,
      status: 0,
    }
  }, 
  created: function () {
      if (!WSC.token) {
          this.$router.push({ path: '/' })
      }
      this.status = this.$route.query.status;
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.pay-result {
    width: 100%;
    margin: 2em auto;
    text-align: center;
}
.pay-result h1 {
  font-size: 2em;
  margin-top: 4em;
}
</style>