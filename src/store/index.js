import Vue from "vue";
// 引入vuex
import Vuex from 'vuex';
Vue.use(Vuex);
// 是共享数据的总入口
// 导入模块
import state from "./state.js";
import mutations from "./mutation.js";
import actions from "./actions.js";

// 实例化一个store
const store = new Vuex.Store({
	state,
	mutations,
	actions,
});

// 暴露 添加到main.js挂载到vue实例中
export default store;