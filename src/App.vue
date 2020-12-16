<template>
  <div id="app">
    <!-- 路由匹配的模板在此显示 -->
    <router-view></router-view>
  </div>
</template>

<script>

export default {
  name: 'App',
  components: {
  }
}
</script>

<style>
/* 公共样式 */
/* 引入图标 */
@import url(./fonts/iconfont.css);
@import url(./styles/common.css);
@import url(./fonts/font_add/iconfont.css);
</style>
