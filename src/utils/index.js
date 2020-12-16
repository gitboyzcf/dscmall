// 检测是否为手机微信端
export function isWeChat(){
	return navigator.userAgent.toLowerCase().indexOf("micromessenger") != -1;
}