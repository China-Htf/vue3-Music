<template>
  <div class="playlist">
    <el-row justify="center">
      <!-- 歌单推荐标题 -->
      <el-col :span="4" class="playlistTitle">
        <h1>歌单推荐</h1>
      </el-col>
      <!-- 歌单推荐图片 -->
      <el-col :span="24" class="playlistImg">
        <el-carousel type="card" height="400px">
          <el-carousel-item name="222" v-for="item in playListResult" :key="item.name">
            <div class="pic_item">
              <img class="palilistimgs" :src="item.picUrl" style="background: cover">
            </div>
          </el-carousel-item>
        </el-carousel>
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { playListRequest } from '@/api/home/playlist/playlist'

// 获取推荐歌单 
let playListResult = ref()
const recommendedPlayList = async () => {
  const resultList = await playListRequest()
  playListResult.value = resultList.result
  console.log(playListResult.value);
  
  
}
recommendedPlayList()



</script>

<style lang="less" scoped>
.playlist {
 .playlistTitle {
   margin-top: 20px;
   letter-spacing:15px;
 }
 .playlistImg {
   .pic_item {
     .palilistimgs {
        width: 100%;
        height: 100%;
        transition:all 0.6s;
        &:hover {
          transform:scale(1.1);
        }
      }
    }
 }
}
</style>