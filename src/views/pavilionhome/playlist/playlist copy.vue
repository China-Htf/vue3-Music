<template>
  <div class="playlist">
    <el-row justify="center">
      <!-- 歌单推荐标题 -->
      <el-col :span="4" class="playlistTitle">
        <h1>歌单推荐</h1>
      </el-col>
      <!-- 歌单推荐图片 -->
      <el-col :span="24" class="playlistImg">
        <el-carousel indicator-position="outside" trigger="click">
          <el-carousel-item v-for="(item, index) in playListResult" :key="index">
              <div class="playListFlex">
                <div class="payListImgName" v-for="(imgList, index2) in item" :key="index2" style="height:100%">
                  <div  style="width:250px;height:250px;">
                    <img class="imagesss" :src="imgList.picUrl" style="width:100%;height:100%;">
                      <el-icon :size="90" color="#31c27c">
                        <VideoPlay></VideoPlay>
                      </el-icon>
                  </div>
                  <div class="nameListss"  style="width:250px;height:200px;">{{imgList.name}}</div>
                </div>
              </div>
          </el-carousel-item>
        </el-carousel>
      </el-col>
      <el-col>
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { useStore } from 'vuex'
import { playListRequest } from '@/api/home/playlist/playlist'
import { VideoPlay } from '@element-plus/icons'

const store = useStore()

// 获取推荐歌单 
let playListResult = ref()
const recommendedPlayList = async () => {
  const resultList = await playListRequest()
  playListResult.value = resultList.result 
}
recommendedPlayList()

let newDataList:any = ref([])
let current = ref(0)
watch(playListResult, (oldValue, newVale) => {
  if(oldValue && oldValue.length > 0) {
    for(let i = 0; i < oldValue.length; i++) {
      if(i%5 !== 0 || i === 0) {      
        if(!newDataList.value[current.value]) {
          newDataList.value.push([oldValue[i]])
        }else {
          newDataList.value[current.value].push(oldValue[i])
        }
      } else {
        current.value++
        newDataList.value.push([oldValue[i]])
        playListResult.value = {...newDataList.value}
        console.log(playListResult.value);
      }
    }
    // console.log(newDataList.value, 'aa');  
  }
  // console.log(newVale, '老值');
  console.log(oldValue, '新值');
})


</script>

<style lang="less" scoped>
.playlist {
 .playlistTitle {
   margin-top: 20px;
   letter-spacing:15px;
 }
 .playlistImg {
    .playListFlex {
      display: flex;
      justify-content:center;
      .payListImgName {
        margin: 10px;
        div {
          cursor: pointer;
          overflow: hidden;
          position: relative;
          transition: 0.6s;
          &:hover {
            .imagesss {
              transform: scale(1.1);
            }
            .el-icon {
              opacity: 1;
              background-color: #f2f2f2;
            }
          }
          .imagesss {
            transition: 0.6s;
          }
          .el-icon {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            opacity: 0;
            transition: 0.6s;
            border-radius: 50px;
          }
        }
      }
      .nameListss {
        margin-top: 20px;
        overflow: hidden;
        text-overflow:ellipsis;
        white-space: nowrap;
        cursor: pointer;
        &:hover {
          color: #31c27c;
        }
      }
    }
 }
}




</style>