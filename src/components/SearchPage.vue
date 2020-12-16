<!-- 搜索商品的成功页面 -->
<template>
	<div class="search-page">
		<CategoryList></CategoryList>
	</div>
</template>

<script>
	import CategoryList from "../views/Category/components/CategoryList.vue";
	export default{
		data(){
			return{
				
			}
		},
		components:{
			CategoryList,
		}
	}
</script>

<style>
</style>
