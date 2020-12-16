// 配置vue项目
// 注意：修改完配置文件后需要重新启动，才能生效
module.exports = {
    publicPath:"./",//打包时使用
    devServer:{
        host:"0.0.0.0", //配置域名
        // port:"",//配置端口号
        // open:true, // 是否使用默认浏览器打开
				
				// 使用vue代理进行跨域请求
				proxy:{ //配置跨域请求
					"/api":{ //在使用数据请求时用/api，代替  https://x.dscmall.cn/api
						target:"https://x.dscmall.cn/api",//配置要代理的域名
						changeOrigin:true, //允许跨域
						pathRewrite:{ //路径重写
							"^/api":""
							
						}
					}
					
				}
    }
}