<!-- 首页头部组件 -->
<template>
  <div class="home-header">
    <header>
      <form action="">
				<router-link to="/search" tag="input" class="header-search" type="text" placeholder="搜索商品名称"></router-link>
        <i class="iconfont icon-sousuo2"></i>
      </form>
      <a href="#" class="iconfont icon-xiaoxi"></a>
    </header>
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

};
</script>

<style lang="less">
.home-header{
    width: 100%;
    height: 4.4rem;
    position: absolute;
    top: 0;
    left: 0;
    background-color:transparent;
    z-index: 99;
    header{
        display: flex;
        form{
            width: 90%;
            position: relative;
            input{
                height: 3rem;
                margin-top:0.7rem ;
                border-radius: 1.5rem;
                margin-left: 1rem;
                text-indent: 1.5rem;
                width: calc(100% - 1rem); //css3新增的计算函数
            }
            i{
                position: absolute;
                top: 0;
                right: 1rem;
                height: 4.4rem;
                line-height: 4.4rem;
                color: #999;
            }
        }
        a{
            display: block;
            height: 4.4rem;
            width: 10%;
            text-align: center;
            line-height: 4.4rem;
            color: #fff;
            font-size: 2rem;
        }
    }
}
</style>