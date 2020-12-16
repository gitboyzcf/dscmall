<!-- 公共搜索栏 -->
<template>
	<div class="search-header">
		<div class="s_header">
			<form action="">
				<ul>
					<li><a href="javascript:;" class="iconfont icon-jiantou3" onclick="window.history.back();"></a></li>
					<li><input ref="input" type="text" placeholder="搜索商品"><i class="iconfont icon-sousuo1"></i></li>
					<li><button type="button" @click="recordSearch">搜索</button></li>				
				</ul>
			</form>
		</div>
	</div>
</template>

<script>
	export default{
		data(){
			return{
			}
		},
		computed:{
			searchText(){
				return this.$store.state.searchText;
			}
		},
		methods:{
			// 点击搜索按钮执行
			// 将搜索内容记录下来
			recordSearch(){
				let s_text = this.$store.state.searchText;
				if(this.$refs.input.value != ""){
					if(s_text.indexOf(this.$refs.input.value) != -1){
						s_text.splice(s_text.indexOf(this.$refs.input.value),1);
					}
					this.$store.commit("changeSearchText",this.$refs.input.value.trim());
					// 点击搜索进行跳转页面
					this.$router.push("/searchPage?keywords="+this.$refs.input.value.trim());
				}
			},
		},
		mounted(){
			// 模板加载完成获得光标
			this.$refs.input.focus();
		}
	}
</script>

<style lang="less">
	.search-header{
		.s_header{
			padding: 0.8rem;
			border-bottom: 1px solid #f1f1f1;
			ul{
				display: flex;
				justify-content: space-between;
				li{
					height: 3rem;
					line-height: 3rem;
				}
				li:nth-child(2){
					border: 1px solid #ddd;
					border-radius: 1.5rem;
					flex: 1;
					margin: 0 1rem;
					position: relative;
					input{
						height: 100%;
						width: 90%;
						text-indent: 1rem;
						border-radius: 1.5rem;
					}
					i{
						position: absolute;
						top:50%;
						right: 1rem;
						transform:translateY(-50%);
					}
				}
				li:nth-child(3){
					button{
						height: 100%;
						width: 100%;
						background-color: transparent;
						font-size: 1.5rem;
					}
				}
			}
		}
	}
</style>
