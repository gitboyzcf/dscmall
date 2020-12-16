<!-- 轮播图 -->
<template>
  <div class="swiper">
    <mt-swipe :auto="4000" @change="handleChange">
      <mt-swipe-item>
        <img src="@/assets/images/bann1.jpg" alt="" />
      </mt-swipe-item>
      <mt-swipe-item>
        <img src="@/assets/images/bann2.jpg" alt="" />
      </mt-swipe-item>
      <mt-swipe-item>
        <img src="@/assets/images/bann3.jpg" alt="" />
      </mt-swipe-item>
      <mt-swipe-item>
        <img src="@/assets/images/bann4.jpg" alt="" />
      </mt-swipe-item>
      <mt-swipe-item>
        <img src="@/assets/images/bann5.jpg" alt="" />
      </mt-swipe-item>
    </mt-swipe>
  </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';

export default {
  //import引入的组件需要注入到对象中才能使用
  components: {},
  data() {
    //这里存放数据
    return {};
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {
    handleChange(index) {
        this.$emit("changeColor",index);
    },
  },
};
</script>
<style lang="less">
.swiper{
    width: 95%;
    height: 12rem;
    margin: 0px auto;
    img{
        height: 12rem;
        width: 100%;
        border-radius: 1rem;
        overflow: hidden;
    }
    .mint-swipe-indicators{
        left: 50px;
    }
}
</style>