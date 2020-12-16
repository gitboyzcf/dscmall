<!-- 用于加载的组件 -->
<template>
	<div class="loading">
		<img src="../assets/images/jiazai.gif" alt="">
		<span>玩命加载中...</span>
	</div>
</template>

<script>
</script>

<style lang="less">
	.loading{
		width: 100%;
		height: 100%;
		position: fixed;
		top: 0;
		left: 0;
		z-index: 999;
		background-color:#f5f3ed ;
		display: flex;
		align-items: center;
		img{
			width: 100%;
		}
		span{
			position: absolute;
			top: 55%;
			left: 50%;
			transform: translateX(-50%);
			color: #fe6d4d;
		}
	}
</style>
