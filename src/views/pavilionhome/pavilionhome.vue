<template>
  <div class="pavilionhome">
    <play-list></play-list>
    <new-start></new-start>
    <goodRecommendation></goodRecommendation>
    <!-- <rankingList></rankingList> -->
    <mv-list></mv-list>
  </div>
</template>

<script setup lang="ts">

// 推荐歌单
import playList from './playlist/playlist.vue'
// 新歌首发
import newStart from './new_start/newstart.vue'
// 精彩推荐
import goodRecommendation from './goodRecommendation/goodRecommendation.vue'
// 排行榜
import rankingList from './rankinglitst/ranking.vue'
// MV
import mvList from './MVList/mvList.vue'

</script>

<style scoped>

</style>