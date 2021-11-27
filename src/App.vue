<template>
  <div id="nav">
  </div>
  <router-view/>
</template>

<script>
document.title = '抑云音乐'
document.addEventListener('visibilitychange', function () {
if (document.visibilityState == 'hidden') {
  document.title = '(つェ⊂)我藏好了哦~ ';
}else {
  document.title = '抑云音乐'
}
});
</script>

<style lang="less">

</style>
