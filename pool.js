const mysql = require('mysql');
//1创建连接池对象
var pool = mysql.createPool({
	host:'127.0.0.1',
	port:3306,
	user:'root',
	password:'',
	database:'xz',
	connectionLimit:15
});

//2导出连接池对象
module.exports = pool;