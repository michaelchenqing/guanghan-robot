<template>
  <div class="login">
    <el-row>
      <el-col :span="8"><div style="height:1em;"></div></el-col>
      <el-col :span="8"> 
        <input v-model="inputValue" ref="keyboard" class="cardno" :placeholder="placeholder" v-focus @blur="blurInput" @focus="focusInput" @keyup.enter="submit">
        <Keyboard :option="option" @keyVal="getInputValue"></Keyboard>
      </el-col>
      <el-col :span="8"></el-col>
    </el-row>  
    <el-row class="login_button">
      <el-col :span="8"><div style="height:1em;"></div></el-col>
      <el-col :span="8">
        <el-button type="primary" @click="onFocus">虚拟键盘</el-button>
        <el-button type="success" @click="payCard">刷身份证</el-button>
      </el-col>
      <el-col :span="8"></el-col>
    </el-row>
  </div>  
</template>
<script>
import { WSC} from "@/api/client";
import Keyboard from '@/components/Keyboard'
import {http_api} from '@/config/env'
import Vue from 'vue'
import VueJsonp from 'vue-jsonp'

Vue.use(VueJsonp)
export default {
  name: 'Login',
  components: {
    Keyboard
  },
  data () {
    return {
      WSC,
      placeholder: "请刷就诊卡",
      option: {
        show: false,
        sourceDom: ''
      },
      inputValue: ''
    }
  },
  directives: {
    focus: {
      // 指令的定义
      inserted: function (el) {
        el.focus()
      }
    }
  },
  created: function() {
    if (WSC.token) {
      this.$router.push({ path: '/index' })
    }
  },
  watch: {
        WSC:{
            handler:function(obj) {
                if (obj.login == 1) {
                    this.$message.success('刷卡成功，欢迎使用');
                    this.$router.push({ path: '/index' })
                } else if (obj.login == 2) {
                  this.inputValue = ''
                  this.$message.error('登录失败，请重试');
                }
            },
            deep:true
        },
    }, 
  methods: {
      submit() {
        if (this.inputValue) {
          WSC.initWebpack(this.inputValue);
        } else {
          this.$message({
            message: '请先刷卡或手动输入',
            type: 'warning'
          });
        }
      },
    getInputValue(val) {
      if(val === 'delete'){
        this.inputValue = this.inputValue.slice(0,this.inputValue.length -1)
      } else if (val === '\n') {
        this.submit()
      } else if (val === 'hide') {
        this.hide()
      } else {
        this.inputValue += val
      }
    },
    onFocus() {
      this.placeholder = "请输入身份证号或手机号"
      this.option = {
        show: true,
        sourceDom: this.$refs['keyboard']
      }
    },
    hide() {
      this.placeholder = "请刷就诊卡"
      this.option = {
        show: false,
        sourceDom: ''
      }
    },
    focusclick () { // 聚焦
      this.$refs.keyboard.focus()
    },
    blurInput() {
      this.focusclick()
      console.log('失去焦点')
    },
    focusInput() {
      console.log('得到焦点')
    },
    payCard() {
      Vue.jsonp(http_api, {lx: 3}).then(json => {
        console.log(json)
      }).catch(err => {
        console.log(err)
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.login {
    width: 100%;
    padding-top: 15vh;
}
.cardno {
  width: 100%;
  -web-kit-appearance:none;
  -moz-appearance: none;
  outline:0;
  font-size:2em;
  height:3em;
  border-radius:8px;
  border:1px solid #c8cccf;
  color:#999999;
  padding-left: 1ch;
  box-shadow: 2px 2px 2px #cccccc;
}
.login_button {
  margin-top: 2rem; text-align: center;
}
</style>
<style>
.login_button .el-button--primary {
  font-size: 2rem;
}
.login_button .el-button--success {
  font-size: 2rem;
}
</style>

