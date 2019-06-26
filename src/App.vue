<template>
  <div id="app">
    <el-container>
      <el-header></el-header>
      <el-main><router-view /></el-main>
      <el-footer></el-footer>
    </el-container>
  </div>
</template>

<script>
import header from '@/components/Header'
import footer from '@/components/Footer'
import { WSC } from "@/api/client";

export default {
  name: 'App',
  components: {
    'el-footer': footer,
    'el-header': header
  },
  data () {
    return {
      
    }
  }, 
  created: function () {},
  mounted: function () {},
  destroyed: function() {
    // 页面销毁时关闭长连接
    WSC.close();
　},
  watch: {},
  computed: {},
  methods: {}
}
</script>

<style>
body {
  margin: 0;
  padding: 0;
  font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;
  color: #606266;
}
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
.el-container {
  height: 100vh;
}
.el-header {
  width: 100%;
}
.el-main {
  width: 100%;
  height: 70vh;
  margin-bottom: 10vh;
}
.el-footer {
  width: 100%;
}
.el-message .el-message__content, .el-message__icon {
    font-size: 2em;
}
</style>