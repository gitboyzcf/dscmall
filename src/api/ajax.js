// 二次封装axios
import Axios from "axios";
/**
 * url 请求的地址
 * params get请求的参数
 * method 请求的方式
 */
function ajaxFn(url = "", params = {}, method = "get") {
	// 用于存放请求到的结果
	let promise = null;
	return new Promise((resolve, reject) => {
		// 判断请求数据的方式
		if (method === "get") {
			// 式get就进行字符串拼接
			let paramsStr = "";
			for (let key in params) {
				paramsStr += key + "=" + params[key] + "&";
			}
			if (paramsStr != "") {
				paramsStr = paramsStr.slice(0, paramsStr.lastIndexOf("&"));
			}
			url += "?" + paramsStr;
			promise = Axios.get(url);
		} else if (method === "post") {
			// post 提交
			promise = Axios.post(url, params);
		}
		promise.then((rel) => {
			// 成功
			resolve(rel);
		}).catch((err) => {
			// 失败
			reject(err);
		})
	})
}

export default ajaxFn;
