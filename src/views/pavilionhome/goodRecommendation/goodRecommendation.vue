<template>
  <div ref="goodRecommendationRef" class="goodRecommendation">
    <el-row justify="center">
        <!-- 精彩推荐标题 -->
        <el-col :span="4" class="playlistTitle">
          <h1>精彩推荐</h1>
        </el-col>
        <!-- 精彩推荐轮播 -->
        <el-col :span="24">
          <el-carousel indicator-position="outside" trigger="click" ref="arrowRef" arrow="never" v-if="goodRecommendationRefList">
            <el-carousel-item v-for="(item, index) in goodRecommendationRefList" :key="index">
              <div class="goodMusicFlex">
                <div class="goodImges" v-for="(item2, index2) in item" :key="index2" >
                  <div style="width:580px;height:260px;">
                    <img class="goodimage" :src="item2.imageUrl" style="width:100%;height:100%;">
                  </div>
                  <div class="goodTitle">
                    {{item2.typeTitle}}
                  </div>
                </div>
              </div>
              <!-- <div  style="width:250px;height:230px;">
                <img :src="item.imageUrl" style="width:100%;height:100%;">
              </div> -->
            </el-carousel-item>
          </el-carousel>
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
import { ref, watch, toRefs } from 'vue'
import { useLazyData } from '@/hooks'
import { newStartRequest } from '@/api/home/goodRecommendation/goodRecommendation'
import { VideoPlay, ArrowLeft, ArrowRight} from '@element-plus/icons'
import { ElCarousel, ElCarouselItem } from 'element-plus'
const goodRecommendationRef = ref(null)

let goodRecommendationRefList = ref()
let { target, result} = useLazyData(goodRecommendationRef,newStartRequest)
let newDataList:any = ref([])
const arrowRef = ref()

let current = ref(0)
watch(result, (newValue, oldValoue) => {
  if(newValue.banners && newValue.banners.length > 0) {
    for(let i = 0; i < newValue.banners.length; i++) {
      if(i%2 !==0 || i === 0) {
        if(!newDataList.value[current.value]) {
          newDataList.value.push([newValue.banners[i]])
        } else {
          newDataList.value[current.value].push(newValue.banners[i])
        }
      } else {
        current.value++
        newDataList.value.push([newValue.banners[i]])
        goodRecommendationRefList.value = {...newDataList.value}
      }
    }
  }
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
.goodRecommendation {
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
    h1 {
      text-align: center;
    }
  }
  .goodMusicFlex {
    display: flex;
    justify-content: center;
    cursor: pointer;
    .goodImges {
      margin: 20px;
      position: relative;
      .goodTitle {
        position: absolute;
        display: flex;
        flex-direction:column;
        justify-content:center;
        align-items: center;
        top: 20px;
        right: 0;
        width: 100px;
        height: 30px;
        background: black;
        color: white;
        border-top-left-radius: 15px;
        border-bottom-left-radius: 15px;
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