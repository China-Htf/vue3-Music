<template>
  <div class="playlist">
    <el-row justify="center">
      <!-- 歌单推荐标题 -->
      <el-col :span="4" class="playlistTitle">
        <h1>歌单推荐</h1>
      </el-col>
      <!-- 歌单推荐图片 -->
      <el-col :span="24" class="playlistImg">
        <el-carousel  type="card">
          <el-carousel-item v-for="item in playListResult" :key="item.name">
            <img :src="item.picUrl" style="width:100%;height:100%;">
          </el-carousel-item>
        </el-carousel>
      </el-col>
      <el-col>
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useStore } from 'vuex'
import { playListRequest } from '@/api/home/playlist/playlist'

const store = useStore()

// const userInfos = computed(() => {
//   store.state.loginModule.userInfo
// })
// console.log(store.state.loginModule.userInfo);

// 获取推荐歌单 
let playListResult = ref()
const recommendedPlayList = async () => {
  const resultList = await playListRequest()
  playListResult.value = resultList.result
  
  
}
recommendedPlayList()



</script>

<style lang="less" scoped>
.playlist {
 .playlistTitle {
   margin-top: 20px;
   letter-spacing:15px;
 }
}
</style>