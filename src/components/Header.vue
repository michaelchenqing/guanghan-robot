<template>
    <div class="header">
        <el-row >
            <el-col :span="8">
                <div class="logoer"><img src="@/assets/logo.png"/></div>
            </el-col>
            <el-col :span="8"><div class="counter">{{count}}</div></el-col>
            <el-col :span="8">
                <div class="handler">
                    <el-row v-if="auth">
                        <el-col :span="8">&nbsp;</el-col>
                        <el-col :span="8"><el-button @click="shouye" style="width:66%;" round><span style="font-size: 1.5em;">首页</span></el-button></el-col>
                        <el-col :span="8">
                          <el-button @click="tuichu" style="width:66%;" round><span style="font-size: 1.5em;">退卡</span></el-button>
                        </el-col>
                    </el-row>
                </div>
            </el-col>
        </el-row>
    </div>
</template>

<script>
import { WSC, TIMER } from "@/api/client";
export default {
    name: 'Header',
    data() {
        return {
            TIMER,
            WSC,
            count: null,
            auth: false,
        }
    },
    watch: {
        TIMER:{
            handler:function(obj) {
                if (obj.scale < 60) {
                    this.count = obj.scale
                }
                if (obj.scale == 120) {
                    this.count = null;
                }
                if (obj.scale == 0) {
                    if (WSC.login == 4) {
                        this.$message({
                            message: '操作完成，自动退卡',
                            type: 'success'
                        });
                    } else {
                        WSC.login = 5;
                        this.$message.error('操作超时，自动退出');
                    }
                    WSC.close();
                    TIMER.clear();
                    this.count = null;
                    this.$router.push({ path: '/' }) 
                }
            },
            deep:true
        },
        WSC:{
            handler:function(obj) {
                if (obj.token) {
                    this.auth = true
                } else {
                    this.auth = false
                    this.$router.push({ path: '/' }) 
                }
            },
            deep:true
        },
    },

    methods: {
        shouye: function () {
            this.$router.push({ path: '/index' })
        },
        login: function() {
            this.$router.push({ path: '/' })
        },
        tuichu: function () {          
            // 页面销毁时关闭长连接
            this.count = null;
            WSC.close();
            WSC.login = 3;
            this.$router.push({ path: '/' })
            this.$message({
                message: '成功退卡',
                type: 'success'
            });
        },
    }
}
</script>

<style scoped>
.header {
    height: 20vh;
    background: #409EFF;
    border-bottom: thin solid #DCDFE6;
}
.logoer {
    padding-top: 4vh;
    padding-left: 2ch;
}
.logoer img {
    height: 100px;
    width: 469px;
}
.counter {
    text-align: center;
    font-size: 6ex;
    color: #ffffff;
    font-weight:bold;
    padding-top:6vh;
}
.handler {
    text-align: center;
    padding-top:6vh;
}
</style>