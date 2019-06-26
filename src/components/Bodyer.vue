<template>
  <div class="bodyer">
    <div class="menuer">
      <el-row type="flex" class="row-bg" justify="space-around">
        <el-col class="menu-left">
          <div class="guahao" @click="register">
            <div class="item-info">
              <div class="gh-img"><img src="../../static/img/doctor_male.png" width="128px" height="128px" /></div>
              <div class="gh-info">挂号服务</div>
            </div>
          </div>
          <div class="jiaofei" @click="payment">
            <div class="item-info">
              <div class="gh-img"><img src="../../static/img/holding-credit-card.png" width="128px" height="128px" /></div>
              <div class="gh-info">门诊缴费</div>
            </div>
          </div>
        </el-col>
        <el-col class="menu-right">
          <div class="wechat" @click="userCenter">
            <div class="item-info">
              <div><img src="../../static/img/contacts.png" width="64px" height="64px" /></div>
              <div class="sybz">个人中心</div>
            </div>
          </div>
          <div class="helper" @click="wechat">
            <div class="item-info">
              <div><img src="../../static/img/messaging.png" width="64px" height="64px" /></div>
              <div class="sybz">微信公众号</div>
            </div>
          </div>  
          
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import { WSC } from "@/api/client";
export default {
  name: 'Bodyer',
  data () {
    return {
      WSC,
    }
  },
  created: function () {
      if (!WSC.token) {
        this.$router.push({ path: '/' })
      }    
  },
  mounted: function() {},
  computed: {},
  methods: {
    mtips: function() {
        this.$message({
          message: '该功能尚未启用',
          type: 'warning'
        });
    },
    wechat: function() {
      if (!WSC.token) {
        this.$router.push({ path: '/'})
      } else {
        this.$router.push({ path: '/wechat' })
      }
    },
    register: function() {
      if (!WSC.token) {
        this.$router.push({ path: '/'})
      } else {
        this.$router.push({ path: '/register/service' })
      }
    },
    userCenter: function() {
      if (!WSC.token) {
        this.$router.push({ path: '/'})
      } else {
        this.$router.push({ path: '/user' })
      }
    },
    payment: function() {
      if (!WSC.token) {
        this.$router.push({ path: '/'})
      } else {
        this.$router.push({ path: '/payment' })
      }
    }
  }
}
</script>

<style scoped>
.bodyer {
    width: 100%;
}
.menuer {
  width: 62vw; margin: 0 auto; 
  margin-top: 5vh;
}
.menu-left {
  width: 40vw;
  padding: 2vmin 0;
}
.menu-right {
  width: 20vw;
  padding: 2vmin 0;
}
.guahao {
  width: 40vw; height: 25vh;
  background: #33CC33;
  overflow: hidden;
}
.jiaofei {
  width: 40vw; height: 25vh;
  background: #CC9900;
  overflow: hidden;
  margin-top: 2vmin;
}
.helper {
  width: 20vw; height: 25vh;
  background: #0099FF;
  overflow: hidden;
  margin-top: 2vmin;
}
.wechat {
  width: 20vw; height: 25vh;
  background: #CC6600;  
  overflow: hidden;
}
.item-info {
  padding: 2vmin;
}
.gh-img {
  width: 128px;
  height: 128px;
  padding: 12px;
  float: left;
}
.gh-info {
  color: #ffffff;
  padding: 12px; 
  font-size: 3em;
  float: left;
  margin-top: 0.5em; 
}
.sybz {
  text-align: center; color: #ffffff; font-size: 2em;
}
</style>