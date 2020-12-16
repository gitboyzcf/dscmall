// 引入删除商品弹窗
import {MessageBox} from 'mint-ui';
// 用于修改共享的数据
const mutations = {
	// 修改分类左侧的数据
	changeCategoryLeft(state, data) {
		state.categoryLeftDatas = data;
	},
	// 修改分类右侧的数据
	changeCategoryRight(state, data) {
		state.categoryRightDatas = data;
	},
	// 修改大图片
	changeImg(state, data) {
		state.ad = data;
	},
	// 修改加载图标显示状态
	changeLoading(state, data) {
		state.showLoading = data;
	},
	// 修改分类id
	changeId(state, data) {
		state.cat_id = data;
	},
	// 修改控制商品的样式
	changeToggleStyle(state, data) {
		state.toggleStyle = data;
	},
	// 修改请求到的数据
	changeCategoryListData(state, data) {
		// state.categoryListDatas = data;
		if (data.length > 0) {
			// 触底请求，有数据时不显示，提示
			state.postBool = false;
			state.categoryListDatas = state.categoryListDatas.concat(data);
		} else {
			state.postBool = true;
		}
	},
	changePostBool(state, data) {
		state.postBool = data;
	},
	// 修改商品详情数据
	changeDetailData(state, data) {
		state.detailDatas = data;
	},
	changeDetailDatasInfo(state, data) {
		state.detailDatasInfo = data;
	},
	// 添加购物车数据
	setCartDatas(state, data) {
		if (data) {
			state.cartDatas.push(data);
		}
		localStorage.setItem("carts", JSON.stringify(state.cartDatas));
	},
	// 点击购物车中商品按钮进行选中 ----
	changeSelectStatue(state, data) {

		// 判断该商铺中的商品是否有被选中
		let bool = state.cartDatas[data.p_index].child.every(itemChild => {
				return itemChild.isSelect == true;
		});
		if(bool){
			state.cartDatas[data.p_index].shop_isSelect = true;
		}else{
			state.cartDatas[data.p_index].shop_isSelect = false;
		}
		
		// 当操作一个按钮时循环所有店铺，判断是否让全选选中
		let selectStatus = state.cartDatas.every(item => {
				return item.shop_isSelect == true;
		});

		state.selectAll = selectStatus;

		// 得到店铺索引和商品索引
		state.cartDatas[data.p_index].child[data.c_index] = data.item.child[data.c_index];
		localStorage.setItem("carts", JSON.stringify(state.cartDatas))
		localStorage.setItem("selectAll", state.selectAll);
	},
	// 点击全选按钮进行修改商品单选按钮----
	changeSelectAllStatus(state) {
		
		// 修改全选
		state.selectAll = !state.selectAll;
		
		// 判断该商铺中的商品是否有被选中
		state.cartDatas.forEach(item=>{
			item.shop_isSelect = state.selectAll;
		})

		// 修改单选
		state.cartDatas.forEach((item) => {
			item.child.forEach(itemChild => {
				itemChild.isSelect = state.selectAll;
			})
		});
		localStorage.setItem("carts", JSON.stringify(state.cartDatas))
		localStorage.setItem("selectAll", state.selectAll);
	},
	// 点击店铺按钮选中该店铺下商品的所有按钮，并判断所有店铺是否已被选中----
	changeShopSelectStatus(state,data){
		state.cartDatas[data].shop_isSelect = !state.cartDatas[data].shop_isSelect;
		state.cartDatas[data].child.forEach(item=>{
			item.isSelect = state.cartDatas[data].shop_isSelect;
		});
		// 判断店铺是否全被选中
		let shopSelectStatus = state.cartDatas.every(item=>{
			return item.shop_isSelect == true;
		});
		if(shopSelectStatus){
			state.selectAll = true;
		}else{
			state.selectAll = false;
		}
		localStorage.setItem("carts", JSON.stringify(state.cartDatas));
		localStorage.setItem("selectAll", state.selectAll);
	},
	
	// 在购物车修改商品
	addGoods(state,data){
		state.cartDatas[data.index].child[data.childIndex].value++;
		localStorage.setItem("carts", JSON.stringify(state.cartDatas));
	},
	reduceGoods(state,data){
		let goods = state.cartDatas[data.index].child[data.childIndex];
		if(goods.value == 1){
			goods.value = 1;
		}else{
			goods.value--;
			localStorage.setItem("carts", JSON.stringify(state.cartDatas));
		}
	},
	delGoods(state,data){
		MessageBox.confirm('亲，确定删除该宝贝吗？').then(() => {
			state.cartDatas[data.index].child.splice(data.childIndex,1);
			// 再次判断此商铺中是否还有商品
			if(state.cartDatas[data.index].child == 0){
				state.cartDatas.splice(data.index,1);
			}
			localStorage.setItem("carts", JSON.stringify(state.cartDatas));
		},()=>{});
	},
	// 商品搜索
	changeSearchText(state,data){
		state.searchText.unshift(data);
		localStorage.setItem("searchText",JSON.stringify(state.searchText));
	},
	
	// 修改用户登录信息
	changeUserInfo(state,data){
		state.userInfo = data;
		localStorage.setItem("userInfo",JSON.stringify(state.userInfo));
	}
	
	
}
export default mutations;
