
var xhangDuoc = require('./xephangDuoc.js');
console.log('DUOC 4800 local '+' on '+new Date());			
 	var io=require('socket.io').listen(4800);
	io.on('connection', function (socket) {	
	socket.on('dsxephangDuoc', function (data) {			
	socket.emit('dsxephangDuoc', xhangDuoc.loadDanhSach(data));		
	});


})




