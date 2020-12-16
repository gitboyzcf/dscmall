// 用于存放数据的
const state = {
	// 商品分类左侧数据
	categoryLeftDatas:[],
	// 商品分类右侧数据
	categoryRightDatas:[],
	// 每一类别的大图片
	ad:"",
	// 判断是否请求完成而现实加载图标
	showLoading:true,
	cat_id:"858",
	// 用于给商品更改样式
	toggleStyle:true,
	// 存放post请求到的数据
	categoryListDatas:[],
	postBool:false, //当没有数据是显示 没有更多了
	// 存放商品详情数据
	detailDatas:{},
	detailDatasInfo:{},
	// 购物车数据 -- 用本地存储
	cartDatas: localStorage["carts"] ? JSON.parse(localStorage["carts"]) : [],
	// 全选按钮
	selectAll: localStorage["selectAll"] ? JSON.parse(localStorage["selectAll"]) : false,
	// 店铺按钮
	shop_isSelect: localStorage["shop_isSelect"] ? JSON.parse(localStorage["shop_isSelect"]):false,
	// 商品搜索
	searchText:localStorage["searchText"] ? JSON.parse(localStorage["searchText"]):[],
	// 用户登录信息
	userInfo:localStorage["userInfo"] ? JSON.parse(localStorage["userInfo"]) : {},
}                                                                                   
export default state;