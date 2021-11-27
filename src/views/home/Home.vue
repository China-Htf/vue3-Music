<template>
  <div class="home">
    <el-container class="homeContent">
      <el-header class="homeHeader">
        <nav-header></nav-header>
      </el-header>
      <el-main class="homeMain">&nbsp</el-main>
      <el-footer class="homeFooter"></el-footer>
    </el-container>

    <router-view></router-view>
  </div>
</template>

<script setup lang="ts">
import navHeader from './cpns/navHeader.vue'


</script>

<style scoped lang="less">
.home {
  width: 100%;
  .homeContent {
    .homeHeader {
      padding: 0;
    }
  }
}

</style>