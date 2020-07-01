/**
 @Author：Wyunfei
 @Date：2019/3/26/16:14
 @FileName: setupProxy.js
 */
const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
    app.use(createProxyMiddleware("/v2", {
        target: "https://api.douban.com", //配置你要请求的服务器地址
        changeOrigin: true,
    }))
};
