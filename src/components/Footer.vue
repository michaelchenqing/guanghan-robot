<template>
  <div class="footer">
    <h2>{{ name }}</h2>
  </div>
</template>

<script>
import config from "@/config/deploy";
export default {
  name: 'Footer',
  data () {
    return {
      name: config.app_name
    }
  },
}
</script>

<style scoped>
.footer {
    width: 100%;
    height: 10vh;
    position:fixed;
    bottom: 0;
    clear:both;
    overflow: hidden;
    background-color: #333333;
    color: #ffffff;
    text-align: center;
    border-top: #E4E7ED medium solid;
}
</style>
