<template>
  <div ref="mvListRef" class="mvList">
    <!-- 最外层 -->
    <el-row v-if="result">
      <el-col :span="24">
        <!-- 标题 -->
        <el-row justify="center" class="mvListTitle">
          <el-col :span="4">
            <h1>MV</h1>
          </el-col>
        </el-row>
        <!-- 内容 -->
        <el-row>
          <div class="mvListFlex">
            <template v-for="(item, index) in result.data" :key="index">
                <div class="jihejihe">
                  <div class="mvListImgs" style="height:160px">
                    <img :src="item.cover" style="width:100%;height:100%;">
                  </div>
                  <div class="wenbenjihe">
                    <div class="jiheName">{{item.name}}</div>
                    <div class="jiheplayCount">{{item.artistName}}</div>
                    <div class="jiheplayCount">播放:{{(item.playCount / 1000).toFixed(1)}}万</div>
                  </div>
                </div>
                <div></div>
            </template>
          </div>
        </el-row>
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts">
import { ref, toRefs } from 'vue'
import { useLazyData } from '@/hooks'
import { mvList } from '@/api/home/mvList/mvList'
let mvListRef = ref()
let { result } = toRefs(useLazyData(mvListRef,mvList))

</script>

<style lang="less" scoped>
.mvList {
  overflow: hidden;
  .mvListTitle {
    margin-top: 20px;
    letter-spacing:15px;
    h1 {
      text-align: center;
    }
  }
  .mvListFlex {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    height: 500px;
    .jihejihe {
      width: 16%;
      height: 40%;
      margin: 10px;
      .mvListImgs {
        cursor: pointer;
        overflow: hidden;
        &:hover {
          img {
            transform: scale(1.1);
          }
        }
        img {
          transition: 0.3s;
        }
      }
      .wenbenjihe {
        margin-top: 10px;
        .jiheName {
          width: 100%;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          color: #000;
          cursor: pointer;
          font-size: 15px;
          &:hover {
            color: #31c27c;
          }
        }
        .jiheplayCount {
          margin-top: 5px;
          font-size: 13px;
          color: #999999;
          cursor: pointer;
          &:hover {
            color: #31c27c;
          }
        }
      }
    }
  }
}

</style>