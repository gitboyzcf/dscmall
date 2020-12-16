// 当异步修改共享数据时处理，提交mutation
// 导入ajax请求方法
import {getCategoryLeft,getCategoryRight,getCategoryList,getDetail} from "@/api/ajaxApi.js";
// console.log(getCategoryRight)
// 异步请求左侧数据提交修改
const actions={
	async actChangeCat_left(context){
		let result = await getCategoryLeft();
		// 提交分类左侧修改
		context.commit("changeCategoryLeft",result.data.data);
	},
	
	async actChangeCat_right(context,cat_id){
		// 请求之前出现加载图标
		context.commit("changeLoading",true);
		let resultRight = await getCategoryRight(cat_id);
		// 检测是否成功
		if(resultRight.data.data){
			// 成功后图标消失
			context.commit("changeLoading",false);
			// 提交分类右侧的数据
			context.commit("changeCategoryRight",resultRight.data.data);
			
			context.commit("changeId",cat_id);
		}
		// 循环左侧数据找出对应的大图片
		context.state.categoryLeftDatas.forEach(item => {
			if(item.cat_id == cat_id){
				// console.log(cat_id);
				context.commit("changeImg",item.touch_catads);
			}
		});
	},
	
	// 提交post请求数据
	async actChangeCategoryList(context,params){
		context.commit("changeLoading",true);
		let result = await getCategoryList("/catalog/goodslist",params,"post");
		context.commit("changeLoading",false);
		context.commit("changeCategoryListData",result.data.data);
	},
	// post请求商品详情
	async actChangeDetailData(context,params){
		let result = await getDetail("/goods/show",params,"post");
		context.commit("changeDetailData",result.data.data);
		// 存放商品详情中的基本信息
		context.commit("changeDetailDatasInfo",result.data.data.basic_info);
	}
}
export default actions;