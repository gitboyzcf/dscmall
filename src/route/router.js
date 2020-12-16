import Vue from "vue";
import VueRouter from "vue-router"; //需要下载

// 使用路由 vue-router 通过 Vue.use() 注册插件
Vue.use(VueRouter);

//cv以下代码解决路由地址重复的报错问题(一劳永逸)
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
	return originalPush.call(this, location).catch(err => err)
}

// 创建组件 --可以省略文件后缀
import Home from "../views/Home/Home.vue";
import Category from "../views/Category/Category.vue";
import Find from "../views/Find/Find.vue";
import Cart from "../views/Cart/Cart.vue";
import Mine from "../views/Mine/Mine.vue";

// 配置路由
let routes = [{
	path: "/home",
	component: Home,
	// 配置home下的子路由
	children: [{
		path: "/home",
		redirect: "/home/index"
	}, {
		path: "index", // 首页
		// 路由懒加载，按需引入对应组件
		component: () => import("../views/Home/children/Index.vue"),
	}, {
		path: "household", // 家用电器
		// 路由懒加载，按需引入对应组件
		component: () => import("../views/Home/children/Household.vue"),
	}, {
		path: "clothing", // 男装女装
		// 路由懒加载，按需引入对应组件
		component: () => import("../views/Home/children/Clothing.vue"),
	}, {
		path: "shoebag", // 鞋靴箱包
		// 路由懒加载，按需引入对应组件
		component: () => import("../views/Home/children/ShoeBag.vue"),
	}, {
		path: "mobilephones", // 手机数码
		// 路由懒加载，按需引入对应组件
		component: () => import("../views/Home/children/MobilePhones.vue"),
	}, {
		path: "computer", // 电脑办公
		// 路由懒加载，按需引入对应组件
		component: () => import("../views/Home/children/Computer.vue"),
	}, {
		path: "hometextiles", // 家居家纺
		// 路由懒加载，按需引入对应组件
		component: () => import("../views/Home/children/HomeTextiles.vue"),
	}, {
		path: "personalmakeup", // 个人化妆
		// 路由懒加载，按需引入对应组件
		component: () => import("../views/Home/children/PersonalMakeup.vue"),
	}, ]
}, {
	path: "/category",
	component: Category
}, {
	path: "/find",
	component: Find
}, {
	path: "/cart",
	component: Cart
}, {
	path: "/mine",
	component: Mine,
	children:[{
		// 登录页面
		path:"login",
		component:() => import("../views/Mine/components/Login.vue"),
	},{
		// 注册页面
		path:"register",
		component:() => import("../views/Mine/components/Register.vue"),
	},{
		// 手机短信登录
		path:"mobileLogin",
		component:() => import("../views/Mine/components/MobileLogin.vue"),
	}]
}, {
	// 配置默认路径
	path: "/",
	redirect: "/home"
}, {
	// 更多秒杀路径
	path: "/seckill",
	component: () => import("../views/Home/components/MoreSeckill.vue")
}, {
	// 搜索页面路由
	path: "/search",
	component: () => import("../components/Search.vue"),
}, {
	// 商品类别详情页
	path: "/categoryList/:cid",
	component: () => import("../views/Category/components/CategoryList.vue"),
}, {
	// 商品详情页
	path: "/goodsdetail/:cid",
	component: () => import("../views/Detail/GoodsDetail.vue"),
}, {
	// 商品搜索结果页
	path: "/searchPage",
	component: () => import("../components/SearchPage.vue"),
}];

// 创建一个路由对象
let router = new VueRouter({
	// 更改路由模式
	// mode:'history',这种模式是浏览器进行解析，本地文件不会进行解析
	// es6 属性及属性值一样可以简写
	routes,
});

// 路由守卫用于拦截
router.beforeEach((to,from,next)=>{
	// 只能访问首页
	// 判断当前用户是否登录，没有登录访问其他页面跳转到登录页
	if(to.path == "/home/index" || to.path == "/mine/register" || to.path == "/mine/login"){
		next();
		return;
	}else{
		if(!JSON.parse(localStorage.getItem("userInfo"))){
			next("/mine/login");
		}
		next();
	}
	
});

// 暴露  --导出路由
export default router;
