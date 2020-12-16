<!-- 搜索页面 -->
<template>
	<div class="search">
		<search-header></search-header>
		<div class="s_content">
			<div class="con-1">
				<div class="title">
					<span>最近搜索</span>
					<span class="iconfont icon-shanchu" @click="delAllRecord"></span>
				</div>
				<div class="info">
					<div v-if="searchDatas.length">
						<router-link tag="span" :to="'/searchPage?keywords='+item" v-for="(item,index) in searchDatas" :key="index">
							{{item}}
						</router-link>
					</div>
					<div v-else>
						<span>暂无</span>
					</div>
				</div>
			</div>
			<div class="con-2">
				<div class="title">
					<span>热门搜索</span>
				</div>
				<div class="info">
					<div>
						<router-link tag="span" :to="'/searchPage?keywords='+item" v-for="(item,index) in hotSearchDatas" :key="index">
							{{item}}
						</router-link>
					</div>
				</div>
			</div>
		</div>
		<Footer></Footer>
	</div>
</template>

<script>
	// 引入共用搜索框
	import SearchHeader from "./SearchHeader.vue";
	import Footer from "./Footer.vue";
	export default{
		data(){
			return{
				bool:true,
				hotSearchDatas:[
					"周大福","内衣","Five Plus","手机"
				],
			}
		},
		computed:{
			searchDatas(){
				return this.$store.state.searchText;
			}
		},
		components:{
			Footer,
			SearchHeader,
		},
		methods:{
			// 删除全部的记录
			delAllRecord(){
				this.$store.state.searchText = [];
				localStorage.removeItem("searchText");
			},
		}
	}
</script>

<style lang="less">
	.search{
		
		.s_content{
			padding: 1rem;
			.con-1,.con-2{
				.title{
					padding: 1rem 0;
					display: flex;
					justify-content: space-between;
					span:nth-child(1){
						font-size: 1.5rem;
					}
				}
				.info{
					span{
						padding: 2px 1rem;
						font-size: 1.3rem;
						color: #686868;
						background-color: #f0f2f5;
						border-radius: 2px;
					}
					&>div:nth-child(1){
						display: flex;
						flex-wrap: wrap;
						span{
							margin: 0.5rem;
						}
					}
				}
			}
			.con-2{
				margin-top: 1rem;
			}
		}
	}
</style>
