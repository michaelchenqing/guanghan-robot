<template>
  <div class="wechat">
    <el-card shadow="always" style="width: 320px; margin: 3em auto;">
      <img src="@/assets/wxcode.jpg" width="280" height="280" />
    </el-card>
    <h1>{{ msg }}</h1>
  </div>  
</template>
<script>
import { WSC } from "@/api/client";
export default {
  name: 'Wechat',
  data () {
    return {
      codeImg: '',
      msg: '欢迎关注广汉市骨科医院微信公众号'
    }
  }, 
  created: function() {
      if (!WSC.token) {
          this.$router.push({ path: '/' })
      }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.wechat {
    width: 100%;
    margin: 2em auto;
    text-align: center;
}
</style>