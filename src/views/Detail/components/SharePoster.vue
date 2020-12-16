<!-- 海报组件 -->
<template>
	<div class="share-poster" v-if="showPoster" @click.self="colsePoster">
		<div class="poster-content">
			<img src="@/assets/images/poster-close.png" alt="" @click="colsePoster">
			<div class="tip">长按保存到本地相册</div>
			<div class="poster-img">
				<img :src="getGoodsInfo.goods_thumb" alt="">
			</div>
			<div class="poster-price">
				<p>{{getGoodsInfo.membership_card_discount_price}}</p>
				<p>{{getGoodsInfo.market_price}}</p>
			</div>
		</div>
		<div class="carate-poster">
			<!-- 合并海报 -->
			<canvas ref="canvas">
				
			</canvas>
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
			showPoster:Boolean,
		},
		watch:{
			// 监听海报的显示
			showPoster(){
				if(this.showPoster == true){
					this.$nextTick(()=>{
						this.savePoster();
					});
				}
			}
		},
		computed:{
			getGoodsInfo(){
				return this.$store.state.detailDatas;
			}
		},
		methods:{
			colsePoster(){
				this.$emit("posterEmitData",false);
			},
			savePoster(){
				// console.log("生成海报");
				// console.log(this.$refs.canvas)
				let canvas = this.$refs.canvas;
				let ctx = canvas.getContext("2d");
				console.log(ctx);
				let W = window.screen.availWidth;//获取屏幕的宽度，不包含任务栏
				let H = window.screen.availHeight;//获取屏幕的高度，不包含任务栏
				console.log(W,H);
				// 获取设备的像素比
				let devicePixelRatio = window.devicePixelRatio || 1;
				// 获取画布的像素比
				let backingPixelRatio = ctx.webkitBackingStorePixelRatio || 1;
				// 计算比例
				let ratio = devicePixelRatio / backingPixelRatio;
				
				// 设置画布的宽高
				canvas.width = W*ratio;
				canvas.height = H*ratio;
				// 保证有宽高
				canvas.style.width = W*ratio+"px";
				canvas.style.height = H*ratio+"px";
				// 将绘图内容进行缩放
				ctx.scale(ratio,ratio);
				// getImageData() 赋值画布上指定矩形的像素数据，
				// 然后通过putImageData() 将图像当回画布
				let imgData = ctx.getImageData(0,0,canvas.width,canvas.height);
				// 将画布填充为白色
				for(let i = 0; i < imgData.data.length; i+=4){
					imgData.data[i] = 255;
					imgData.data[i+1] = 255;
					imgData.data[i+2] = 255;
					imgData.data[i+3] = 255;
				}
				// 从0，0位置复制图像到画布上；
				ctx.putImageData(imgData,0,0);
			}
		},
		mounted(){
			console.log(this.$store.state.detailDatas)
		}
	}
</script>

<style lang="less">
	.share-poster{
		position:fixed;
		top:0;
		left: 0;
		bottom: 0;
		right: 0;
		background-color: rgba(0,0,0,0.5);
		display: flex;
		justify-content: center;
		align-items: center;
		z-index: 99;
		.poster-content{
			width: 70%;
			height: 70%;
			background-color: #fff;
			position: relative;
			.tip{
				height: 2rem;
				width: 100%;
				text-align: center;
				line-height: 2rem;
				position: absolute;
				bottom:-3rem;
				left: 0;
				color: #fff;
				font-size: 1.4rem;
			}
			&>img{
				width: 2rem;
				height: 3.2rem;
				position: absolute;
				top: -3.2rem;
				right: 1rem;
			}
			.poster-img{
				width: 100%;
				img{
					width: 100%;
				}
			}
		}
		.carate-poster{
			position: fixed;
			top: 0;
			left: 0;
		}
	}
</style>
