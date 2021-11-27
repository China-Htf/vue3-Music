<template>
  <div class="playlist">
    <el-row justify="center">
      <!-- 歌单推荐标题 -->
      <el-col :span="4" class="playlistTitle">
        <h1>歌单推荐</h1>
      </el-col>
      <!-- 歌单推荐图片 -->
      <el-col :span="24" class="playlistImg">
        <el-carousel indicator-position="outside" trigger="click" arrow="never" ref="arrowRef">
          <el-carousel-item v-for="(item, index) in playListResult" :key="index">
              <div class="playListFlex">
                <div class="payListImgName" v-for="(imgList, index2) in item" :key="index2" style="height:100%">
                  <div  style="width:250px;height:230px;">
                    <img class="imagesss" :src="imgList.picUrl" style="width:100%;height:100%;">
                      <el-icon color="#31c27c">
                        <VideoPlay></VideoPlay>
                      </el-icon>
                  </div>
                  <div class="nameListss"  style="width:250px;">{{imgList.name}}</div>
                  <div class="bofangliangList" style="">播放量:{{imgList.trackCount}}万</div>
                </div>
              </div>
          </el-carousel-item>
        </el-carousel>
      </el-col>
      <el-col>
      </el-col>
    </el-row>
    <div class="leftArrow" @click="arrowClick('left')">
      <el-icon :size="79"><arrow-left /></el-icon>
    </div>
    <div class="rightArrow" @click="arrowClick('right')">
      <el-icon :size="79"><arrow-right /></el-icon>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, reactive } from 'vue'
import { useStore } from 'vuex'
import { playListRequest } from '@/api/home/playlist/playlist'
import { VideoPlay, ArrowLeft, ArrowRight} from '@element-plus/icons'
import { ElCarousel, ElCarouselItem } from 'element-plus'
import 'element-plus/theme-chalk/el-carousel.css'
import 'element-plus/theme-chalk/el-carousel-item.css'

const store = useStore()
const arrowRef = ref()

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

// 轮播图点击功能
const arrowClick = (val: string) => {
  if(val == 'left') {
    arrowRef.value.prev()
  } else {
    arrowRef.value.next()

  }
  
}

</script>

<style lang="less" scoped>
.playlist {
  position: relative;
  overflow: hidden;
  &:hover {
    .rightArrow {
      right: 0;
    }
    .leftArrow {
      left: 0;
    }
  }
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
          // transition: 0.6s;
          &:hover {
            .imagesss {
              transform: scale(1.1);
              opacity: 0.6;
            }
            .el-icon {
              opacity: 1;
              font-size: 90px;
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
            transition: 0.3s;
            border-radius: 50px;
            font-size: 0px;
          }
        }
      }
      .nameListss {
        margin-top: 15px;
        overflow: hidden;
        text-overflow:ellipsis;
        white-space: nowrap;
        cursor: pointer;
        font-family: poppin,Tahoma,Arial,\5FAE\8F6F\96C5\9ED1,sans-serif;
        &:hover {
          color: #31c27c;
        }
      }
      .bofangliangList {
        color: #ddd;
        margin-top: 5px;
        &:hover {
          cursor: text;
        }
      }
    }
 }
 .leftArrow {
   position: absolute;
   display: flex;
   flex-direction:column;
   justify-content:center;
   left: -80px;
   top: 35%;
   height: 150px;
   cursor: pointer;
   color: #3ac27c;
   background: #ececec;
   transition: .3s;
   &:hover {
     background: #e0e0e0;
   }
 }
 .rightArrow {
  position: absolute;
  display: flex;
  flex-direction:column;
  justify-content:center;
  right: -80px;
  top: 35%;
  height: 150px;
  cursor: pointer;
  color: #3ac27c;
  background: #ececec;
  transition: .3s;
  &:hover {
    background: #e0e0e0;
  }
 }
}




</style>