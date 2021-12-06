<template>
  <div class="newStart">
    <el-row justify="center">
        <el-col :span="4"  class="newStartTitle">
          <h1>新歌首发</h1>
        </el-col>
        <el-col :span="24">
          <div class="newStartTwoTitle">
            <template v-for="(item, index) in newStartResult" :key="index">
              <span :class="item.type == activeIndex ? 'newStartactive' : ''" @click="newStartClick(item.type)">{{item.name}}</span>
            </template>
          </div>
        </el-col>
        <el-col :span="24" v-if="newMusicResult">
          <el-carousel indicator-position="outside" height="500px"  trigger="click" ref="arrowRef" arrow="never">
            <el-carousel-item v-for="(item, index) in newMusicResult" :key="index">
              <div class="newStartImgName">
                <div v-for="(item2, index2) in item" :key="index2">
                  <div class="musicFlex">
                    <div style="width:110px;height:120px;" class="musicImg" @click="tiaozhuaun(item2.id)">
                      <img :src="item2.album.blurPicUrl" style="width:100%;height:100%;">
                      <el-icon color="#31c27c">
                        <VideoPlay></VideoPlay>
                      </el-icon>
                    </div>
                    <div class="musicTitle" style="width:160px; height: 120px">
                      <div class="musicTitleOnes">
                        <span class="musicTitleOne">{{item2.name}}</span>
                      </div>
                      <div class="musicTitleTwos">
                        <span class="musicTitleTwo">{{item2.artists[0].name}}</span>
                      </div>
                    </div>
                  </div>
                  <hr>
                </div>
              </div>
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
import { ref, reactive, watch } from 'vue'
import { useRouter } from 'vue-router'
import { VideoPlay, ArrowLeft, ArrowRight} from '@element-plus/icons'
import { newStartRequest } from '@/api/home/newstart/newstart'
import { requestAccountInfo } from '@/api/home/login/login'

const router = useRouter()

let newStartResult = reactive([
  {name: '最新', type: 0}, 
  {name: '华语', type: 7}, 
  {name: '欧美', type: 96}, 
  {name: '日本', type: 8}, 
  {name: '韩国', type: 16}
])
let activeIndex = ref(0);
// 获取推荐歌曲
let newMusicResult = ref();
const arrowRef = ref()

const newStartClick = async (index: number) => {
  newMusicResult.value = null
  activeIndex.value = index;
  const newStartResult:any = await newStartRequest(index);
  newMusicResult.value = newStartResult.data;
  
}
newStartClick(0)

let newDataList:any = ref([])
let current = ref(0)
watch(newMusicResult, (oldValue, newVale) => {
  if(oldValue && oldValue.length > 0) {
    newDataList.value = []
    current.value = 0
    for(let i = 0; i < 63; i++) {
      if(i%9 !== 0 || i === 0) {      
        if(!newDataList.value[current.value]) {
          newDataList.value.push([oldValue[i]])
        }else {
          newDataList.value[current.value].push(oldValue[i])
        }
      } else {
        current.value++
        newDataList.value.push([oldValue[i]])
        newMusicResult.value = {...newDataList.value}
        // console.log(newMusicResult.value);
      }
    }
    // console.log(newMusicResult.value);  
  }
  // console.log(oldValue, '新值');
})

// 轮播图点击功能
const arrowClick = (val: string) => {
  if(val == 'left') {
    arrowRef.value.prev()
  } else {
    arrowRef.value.next()
  }  
}

// 跳转播放页
const tiaozhuaun = (musicId: number) => {
  router.push({path: '/player', query: {music: musicId}})
}
</script>

<style lang="less" scoped>
.newStart {
  overflow: hidden;
  position: relative;
  height: 600px;
  &:hover {
    .rightArrow {
      right: 0;
    }
    .leftArrow {
      left: 0;
    }
  }
  .newStartTitle {
    margin-top: 20px;
    letter-spacing:15px;
    h1 {
      text-align: center;
    }
  }
  .newStartTwoTitle {
    display: flex;
    justify-content:center;
    span {
      font-size: 18px;
      margin: 0 24px;
      cursor: pointer;
    }
    .newStartactive {
      color: #31c27c;
    }
  }
  .newStartImgName {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    margin-top: 24px;
    .musicFlex {
      display: flex;
    justify-content: center;

      width: 450px;
      height: 150px;
      .musicImg {
        cursor: pointer;
        overflow: hidden;
        position: relative;
        img {
          transition: 0.3s;
        }
        &:hover {
          img {
            transform: scale(1.1);
            opacity: 0.6;
          }
          .el-icon {
            font-size: 60px;
          }
        }
        .el-icon {
          position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            transition: 0.3s;
            border-radius: 50px;
            font-size: 0px;
        }
      }
      .musicTitle {
        display: flex;
        flex-direction: column;
        justify-content: center;
        margin-left: 15px;
        .musicTitleOnes {
          overflow: hidden;
            width: 160px;
            text-overflow:ellipsis;
            white-space: nowrap;
          .musicTitleOne {
            font-size: 16px;
            font-weight: 400;
            cursor: pointer;
            &:hover {
              color: #31c27c;
            }
          }
        }
        .musicTitleTwos {
          margin-top: 5px;
          font-size: 14px;
          cursor: pointer;
          color: rgb(153, 153, 153);
          &:hover {
            color: #31c27c;
          }
        }
      }
      hr {
        box-shadow: 0;
      }
    }
  }
   .leftArrow {
   position: absolute;
   display: flex;
   flex-direction:column;
   justify-content:center;
   left: -80px;
   top: 38%;
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
  top: 38%;
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