import ajax from "./ajax.js";

const Base_URL = "/api";

export default function getHomeList(url,params){
	return ajax(Base_URL+url,params)
}

// 分类左侧请求方法
export function getCategoryLeft(){
	return ajax(Base_URL + "/catalog/list");
}

// 分类右侧请求方法
export function getCategoryRight(cat_id){
	return ajax(Base_URL+"/catalog/list/"+cat_id);
}

// Post请求每一类商品数据
export const getCategoryList = (url,params,method)=> ajax(Base_URL+url,params,method);

// post请求商品详情
export const getDetail = (url,params,method) => ajax(Base_URL+url,params,method);
