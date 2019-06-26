<template>
  <div class="keyboard" v-show="showKeyboard">
    <p v-for="keys in keyList">
      <template v-for="key in keys">
        <i v-if="key === 'del'" @click.stop="clickKey" class="key-delete">删除</i>
        <i v-else-if="key === 'enter'" @click.stop="clickKey" class="tab-enter">确定</i>
        <i v-else-if="key === 'hide'" @click.stop="clickKey" class="tab-hide">隐藏</i>
        <i v-else @click.stop="clickKey">{{key}}</i>
      </template>
    </p>
  </div>
</template>

<script>
import clickoutside from '@/api/clickoutside'
export default {
  directives: { clickoutside },
  data() {
    return {
      keyList: [],
      terminal: [
        ['1', '2', '3', '4', '5'],
        ['6', '7', '8', '9', 'del'],
        ['hide', 'x', '0', 'enter']
      ],
    }
  },
  props: {
    option: {
      type: Object
    }
  },
  computed: {
    showKeyboard(){
      return this.option.show
    }
  },

  mounted() {
    this.keyList = this.terminal
  },

  methods: {

    clickKey(event) {
      let value = event.srcElement.innerText
      value && value !== "确定" && value !== "删除" && value !== "隐藏" ? this.emitValue(value) : this.tabHandle(event.srcElement.classList)
    },

    tabHandle({ value = '' }) {
      if(value.indexOf('key-delete') > -1){
        this.emitValue('delete')
      }else if(value.indexOf('tab-enter') > -1){
        this.emitValue('\n')
      }else if(value.indexOf('tab-hide') > -1){
        this.emitValue('hide')
      }
    },

    emitValue(key) {
      this.$emit('keyVal', key)
    },
  }
}
</script>
<style scoped lang="less">
.keyboard {
  width: 100%;
  margin: 0 auto;
  font-size: 1.25em;
  border-radius: 2px;
  padding-top: 0.5em;
  background-color: #DCDFE6;
  user-select: none;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 999;
  pointer-events: auto;
  p {
    width: 95%;
    margin: 0 auto;
    height: 4em;
    margin-bottom: 0.5em;
    display: flex;
    display: -webkit-box;
    flex-direction: row;
    flex-wrap: nowrap;
    justify-content: center;
    i {
      color: #606266;
      display: block;
      margin: 0 1%;
      height: 2em;
      line-height: 2em;
      font-style: normal;
      font-size: 2em;
      border-radius: 2px;
      width: 44px;
      background-color: #fff;
      text-align: center;
      flex-grow: 1;
      flex-shrink: 1;
      flex-basis: 0;
      -webkit-box-flex: 1;
      &:active {
        background-color: darken(#ccc, 10%);
      }
    }
    .tab-top {
      width: 50px;
      margin: 0 1%;
      background: #cccdd0;
      color: #fff;
      font-size: 24px;
    }
    .key-delete {
      width: 50px;
      margin: 0 1%;
      color: #ffffff;
      background: #E6A23C;
    }
    .tab-num {
      font-size: 18px;
      background: #dedede;
      color: #5a5959;
    }
    .tab-point {
      width: 20px;
    }
    .tab-blank {
      width: 80px;
      font-size: 12px;
      padding: 0 15px;
      color: #5a5959;
      line-height: 60px;
    }
    .tab-hide {
      color: #ffffff;
      background: #909399;
    }
    .tab-enter {
      color: #ffffff;
      background: #67C23A;
    }
    &:nth-child(2) {
      width: 88%;
    }
  }
}
</style>
