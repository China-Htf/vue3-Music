<template>
  <div class="player">
    <div class="ceshi">
      <button @click="aaaa">开启音乐</button>
      <button @click="aaa">暂停音乐</button>
      <el-row>
        <el-col :span="24">
          <!-- 内容区 -->
          <el-row class="playerMain">
            <!-- 功能位 -->
            <el-col :span="17">
              <!-- 操作按钮 -->
              <el-row class="buttonRow">
                <el-button>收藏</el-button>
                <el-button>添加到</el-button>
                <el-button>下载</el-button>
                <el-button>删除</el-button>
                <el-button>清空列表</el-button>
              </el-row>
              <!-- 歌词、歌曲多选框 -->
              <el-row></el-row>
              <!-- 音乐菜单 -->
              <el-row></el-row>
            </el-col>
            <!-- 歌词滚动 -->
            <el-col :span="7"></el-col>
          </el-row>
        </el-col>
      </el-row>
      <div class="main-footer" style="width:100%;height:60px">
        <el-row style="width:100%">
          <!-- 上一曲 -->
          <el-col :span="1">
            <el-icon size="50" color="white">
              <DArrowLeft />
            </el-icon>
          </el-col>
          <!-- 播放与暂停 -->
          <el-col :span="1">
            <el-icon size="50" color="white" @click="bofangClick">
              <CaretRight v-if="bofang"/>
              <Headset v-else/>
            </el-icon>
          </el-col>
          <!-- 下一曲 -->
          <el-col :span="1">
            <el-icon size="50" color="white">
              <DArrowRight/>
            </el-icon>
          </el-col>
          <el-col :span="19">
            <el-row justify="space-between">
              <el-col :span="5">
                占位
              </el-col>
              <el-col :span="3">
                <span class="zongShiJian">
                  {{(musicTimeDang / 60).toFixed(2)}} / {{(musicTimeZong / 60).toFixed(2)}}
                </span>
              </el-col>
            </el-row>
            <el-row>
              <el-col>
                <el-progress :percentage="musicGun" color="#31c27c" />
              </el-col>
            </el-row>
          </el-col>
        </el-row>
      </div>
    </div>
  </div>
  <audio 
    ref="audioRef"
    @timeupdate="timeupdateListener"
    :src="MusicURL"
    controls="controls">
  </audio>
</template>

<script setup lang="ts">
import { ref, watchEffect } from 'vue'
import { useRoute } from 'vue-router'
import { musicURL } from '@/api/playlist/playlist'
import { DArrowLeft, DArrowRight, CaretRight, Headset } from '@element-plus/icons'

let MusicURL = ref(null)
// 拿到audio的ref
const audioRef:any = ref(null)
// 不需要audio显示
const audioShow = false
// 播放icon
let bofang = ref(true)
// 播放总时长
let musicTimeZong = ref(0)
// 当前时间
let musicTimeDang = ref(0)
// 当前 / 总时间
let musicGun:any = ref(0)


const route = useRoute()
const Music = async (id: any) => {
  const ceshi: any =  await musicURL(id)
  MusicURL.value = ceshi.data[0].url
  
}
Music(route.query.music)

const bofangClick = () => {
  if(bofang.value) {
    audioRef.value?.play() 
  } else {
    audioRef.value?.pause()
  }
  bofang.value = !bofang.value
}
const timeupdateListener = () => {
  console.log('总时长' + audioRef.value?.duration);
  console.log('当前' + audioRef.value?.currentTime);
  musicTimeZong.value = (audioRef.value?.duration).toFixed(0);
  musicTimeDang.value = (audioRef.value?.currentTime).toFixed(0);
  musicGun.value = (musicTimeDang.value / musicTimeZong.value * 100).toFixed(2);
  console.log(musicGun.value);
  
}

</script>

<style lang="less" scoped>
.player {
    position: absolute;
    width: 100%;
    height: 100%;
    background-color: black;
    .playerMain {
        .buttonRow{
          margin: 40px 0 0 60px;
          .el-button {
            background: none;
            color: #fff;
            border-color: hsla(0,0%,100%,.2);
            opacity: .8;
            &:hover {
              border-color: #ffffff;
            }
          }
        } 
    }
}
.ceshi {
  position: relative;
  height: 100%;
  .main-footer {
    position: absolute;
    bottom: 0;
  }
}
.zongShiJian {
  color: #fff;
}
</style>