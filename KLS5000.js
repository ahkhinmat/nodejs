

	var xhangDuoc = require('./xephangDuocFull.js');
	var xhangKhamBenh = require('./xhangKhamBenhFull.js');
 	var io=require('socket.io').listen(5000);
	 console.log('DUOC 5000 '+' on '+new Date());	
	io.on('connection', function (socket) {	

	socket.on('dsxephangKhamBenh', function (data) {			
	socket.emit('dsxephangKhamBenh', xhangKhamBenh.loadDanhSach(data));		
	});


	socket.on('dsxephangDuoc', function (data) {
	console.log('DUOC 5000 dsxephangDuoc '+' on '+new Date());			
	socket.emit('dsxephangDuoc', xhangDuoc.loadDanhSach(data));		
	});
})




