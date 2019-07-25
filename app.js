const express = require('express');
//3引入body-parser中间件
const bodyParser = require('body-parser');
//引入用户路由器
const userRouter = require('./routes/user.js');
//引入商品路由器
const productRouter = require('./routes/product.js');
var app = express();
app.listen(8080);

//3使用body-parser中间件，将post请求的数据解析为对象
app.use(bodyParser.urlencoded({
	extended:false  //不使用扩展的查询字符串模块qs,而是使用官方提供的querystring模块解析为对象
}));

//1托管静态资源到public目录
app.use(express.static('./public'));
//2使用路由器，挂载到/user   /user/reg
app.use('/user',userRouter);
//2使用路由器，挂载到/product   /product/reg
app.use('/product',productRouter);
