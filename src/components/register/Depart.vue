<template>
  <div class="depart">
    <div class="liucheng">
      <el-row :gutter="24">
        <el-steps :active="0" finish-status="success" align-center>
          <el-step title="选择科室"></el-step>
          <el-step title="选择医生"></el-step>
          <el-step title="确认挂号"></el-step>
          <el-step title="订单支付"></el-step>
        </el-steps>
      </el-row>
    </div>
    <div class="keshi-list">
      <el-row :gutter="24">
        <ul>
          <li class="keshi-li" v-for="item in tableData">
            <div class="grid-content bg-purple" @click="xzks(item.ksbm, item.ksmc)">
              <div class="keshi-name">{{item.ksmc}}</div>
              <div class="keshi-dizhi">{{item.kswz || '未知'}}</div>
            </div>
          </li>
        </ul>
      </el-row>
    </div>  
  </div>  
</template>
<script>
import { WSC } from "@/api/client";
export default {
  name: 'Depart',
    data() {
      return {
        WSC,
        tableData: [],
        message: this.$message
      }
    },
    created: function () {
      if (WSC.token) {
        const params = {
            'module': 'Robot',
            'method': 'getDepartment'
        }

        WSC.websocketsend(params).then(result => {
            if (result.code === 0 && result.data.length > 0) {
                this.tableData = result.data
            }
        }).catch(err => {
            this.message.error(err.message);
        });
      } else {
        this.$router.push({ path: '/' })
      }
    },
    mounted: function() {},
    computed: {},
    methods: {
      xzks: function(ksbm, ksmc) {
        this.$router.push({ path: '/register/doctor', query: { ksbm: ksbm, ksmc:ksmc } })
      }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .depart {
    width: 100%;
    margin: 2em auto;
  }
  .keshi-list {
    margin: 0 auto;
    width: 90;
  }
  .keshi-li {
    width: 20%;
    float: left;
    list-style-type:none;  
    margin: 0px; 
    padding: 2%;
  }
  .bg-purple {
    background: #67C23A;
  }
  .grid-content {
    border-radius: 8px; 
    text-align: center;
    color: #ffffff;
    padding: 1em;
  }
  .keshi-name {
    font-size: 2.5em;
  }
  .keshi-dizhi {
    font-size: 1.5em;
  }
</style>
<style>
.liucheng .el-step .el-step__title{
  font-size: 2em;
}
</style>