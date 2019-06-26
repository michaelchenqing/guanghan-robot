<template>
  <div class="user">
      <el-row :gutter="20">
        <el-col :span="6"><div class="right">姓名：</div></el-col>
        <el-col :span="6"><div class="left">{{userinfo.xm || '未知'}}</div></el-col>
        <el-col :span="6"><div class="right">性别：</div></el-col>
        <el-col :span="6"><div class="left">{{userinfo.xb || '未知'}}</div></el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="6"><div class="right">民族：</div></el-col>
        <el-col :span="6"><div class="left">{{userinfo.mz || '未知'}}</div></el-col>
        <el-col :span="6"><div class="right">生日：</div></el-col>
        <el-col :span="6"><div class="left">{{userinfo.csrq || '未知'}}</div></el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="6"><div class="right">卡号：</div></el-col>
        <el-col :span="6"><div class="left">{{userinfo.cardno || '未知'}}</div></el-col>
        <el-col :span="6"><div class="right">电话：</div></el-col>
        <el-col :span="6"><div class="left">{{userinfo.dh || '未知'}}</div></el-col>
      </el-row>
  </div>
</template>

<script>
import { WSC } from "@/api/client";
export default {
  name: 'User',
  data () {
    return {
      WSC,
      userinfo: {}
    }
  },
  created: function () {
      if (!WSC.token) {
          this.$router.push({ path: '/' })
      }    
      const params = {
          'module': 'Robot',
          'method': 'getUserInfo',
      }
      
      WSC.websocketsend(params).then(result => {
          if (result.code === 0) {
            this.userinfo = result.data
          } else {
              this.message.error("接口异常，请重试");
          }
      }).catch(err => {
          this.message.error(err.message);
      });
  }  
}
</script>

<style scoped>
  .user {
    width: 70%;
    margin: 2.5em auto;
    font-size: 2em;
    line-height: 2em;
    
  }
  .left {
    text-align: left;
  }
  .right {
    text-align: right;
  }
  .el-row {
    margin-top: 1em;
  }
  .el-col {
    border-radius: 4px;
  }
</style>