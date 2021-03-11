 //const format = require("node.date-time");
 var Pusher = require('pusher');

var pusher = new Pusher({
  appId: '572933',
  key: 'a104cc00cc6742991536',
  secret: '57956ee2886bc3647030',
  cluster: 'ap1',
  encrypted: true
});


	var io=require('socket.io').listen(4100);
	io.on('connection', function (socket) {	
		socket.on('goiloa', function (data) {			
			
			socket.broadcast.emit("goiloa", data);	
			//console.log('goiloa-4100: From IP '+data.IPView+'mayte:'+data.MaYTe+'TrangThai'+data.TrangThai+ ' on '+new Date());
			
		});
		
		socket.on('pusher4100', function (data) {	
			if(data.TenBenhNhan!='')
			{
				pusher.trigger('my-channel', 'my-event', {
											  "message": data.TenBenhNhan,
											  "ListTiepNhanId":data.ListTiepNhanId
											  	});
			}
		
		
	})

})

	



