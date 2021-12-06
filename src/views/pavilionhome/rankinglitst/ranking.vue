<template>
  <div ref="rankingListRef" class="rankingList">
    <!-- 最外层 -->
    <el-row>
      <el-col :span="24">
        <!-- 标题 -->
        <el-row justify="center" class="rankingListTitle">
          <el-col :span="4">
            <h1>排行榜</h1>
          </el-col>
        </el-row>
        <!-- 排行榜 -->
        <el-row>
          <el-col :span="4" class="heijiao">
            <el-row>
              <el-col :span="24">巅峰榜</el-col>
              <el-col :span="24">{{result?.playlist?.name}}</el-col>
            </el-row>
            <el-row></el-row>
            <el-row></el-row>
          </el-col>
          <el-col :span="4" class="biaosheng"></el-col>
          <el-col :span="4" class="xinge"></el-col>
          <el-col :span="4" class="yuanchuang"></el-col>
          <el-col :span="4" class="rege"></el-col>
        </el-row>
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts">
import { ref, toRefs } from 'vue'
import { useLazyData } from '@/hooks'
import {
  heiJiaoVip,
  biaoSheng,
  xinGe,
  yuanChuang,
  reGe
} from '@/api/home/rankinglitst/rankinglitst'
let rankingListRef = ref()
let {result} = useLazyData(rankingListRef,heiJiaoVip)




</script>

<style lang="less" scoped>
.rankingList {
  .rankingListTitle {
    margin-top: 20px;
    letter-spacing:15px;
    h1 {
      text-align: center;
    }
  }
}
</style>