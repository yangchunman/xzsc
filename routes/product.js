const express = require('express');
//5.引入连接池对象
const pool = require('../pool.js');
//1.创建路由器对象
var router = express.Router();

//2.添加路由
//（1）商品列表
router.get('/list',function(req,res){
	var obj = req.query;
	//console.log(obj);
	var pno = obj.pno;
	var size = obj.size;
	//如果页码为空，默认为1
	if(!pno) pno = 1;
	//如果大小为空，默认为9
	if(!size) size = 9;
	//转为整型
	pno = parseInt(pno);
	size = parseInt(size);
	//计算开始查询的值
	var start = (pno-1)*size;
	//执行SQL语句
	pool.query('SELECT lid,price,title FROM xz_laptop LIMIT ?,?',[start,size],function(err,result){
		if(err) throw err;
		res.send(result);
	});
});
//（2）商品详情
router.get('/detail',function(req,res){
	var obj = req.query;
	//console.log(obj);
	if(!obj.lid){
		res.send({code:401,msg:'lid required'});
		return;
	}
	//执行SQL语句
	//查找用户表中编号对应的数据
	pool.query('SELECT * FROM xz_laptop WHERE lid=?',[obj.lid],function(err,result){
		if(err) throw err;
		//判断是否检索到用户，如果检索到，把该用户的对象响应到浏览器，否则响应检索不到
		if(result.length>0){
			res.send(result[0]);
		}else{
			res.send({code:301,msg:'can not found'});
		}
	});
});
//（3）删除商品
router.get('/delete',function(req,res){
	//获取数据
	var obj = req.query;
	//console.log(obj);
	if(!obj.lid){
		res.send({code:401,msg:'lid required'});
		return;
	}
	//执行SQL语句
	pool.query('DELETE FROM xz_laptop WHERE lid=?',[obj.lid],function(err,result){
		if(err) throw err;
		if(result.length>0){
			res.send({code:200,msg:'delete suc'});
		}else{
			res.send({code:301,msg:'delete err'});
		}
	});
});
//（4）添加商品
router.post('/add',function(req,res){
	var obj = req.body;
	var i = 400;
	for(var key in obj){
		i++;
		if(!obj[key]){
			res.send({code:i,msg:key+'required'});
			return;
		}
		pool.query('INSERT INTO xz_laptop SET ?',[obj],function(err,result){
			if(err) throw err;
			if(result.affectedRows>0){
			res.send({code:200,msg:'add suc'});
			}
		});
	}
});

//3.导出路由器对象
module.exports = router;