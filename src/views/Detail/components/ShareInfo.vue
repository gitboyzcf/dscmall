<!-- 分享给好友 -->
<template>
	<div class="share-info-mask" v-if="showShareInfo">
		<div class="shareinfo-mask">
			<img src="@/assets/images/share-bg.png" @click="closeShareInfo" alt="">
		</div>
	</div>
</template>

<script>
	export default{
		data(){
			return{
				
			}
		},
		props:{
			showShareInfo:Boolean,
		},
		methods:{
			// 隐藏指向
			closeShareInfo(){
				this.$emit("setShareInfoStatus",false);
			}
		}
	}
</script>

<style lang="less">
	.share-info-mask{
		position: fixed;
		top:0;
		left: 0;
		bottom: 0;
		right: 0;
		width: 100%;
		z-index: 999;
		img{
			width: 100%;
		}
	}
</style>
