 const format = require("node.date-time");
 var Pusher = require('pusher');

var pusher = new Pusher({
  appId: '572933',
  key: 'a104cc00cc6742991536',
  secret: '57956ee2886bc3647030',
  cluster: 'ap1',
  encrypted: true
});
 	var io=require('socket.io').listen(4900);
	io.on('connection', function (socket) {		
	socket.on('goiloa', function (data) {			
		
	
	//console.log('goiloa-4900: From IP '+data.IPView+'mayte:'+data.MaYTe+'Call_SCOPE_IDENTITY:'+data.Call_SCOPE_IDENTITY+'TrangThai'+data.TrangThai+ ' on '+new Date());
		
		if(data.Call_SCOPE_IDENTITY==4652)
		{
			socket.broadcast.emit("goiloa", {//kết nối bằng event goi loa
							TenBenhNhan:data.TenBenhNhan,
							TenPhongBan: data.TenBenhNhan,
							IPView:data.TenBenhNhan,
							NamSinh:data.TenBenhNhan,
							MaYTe:data.TenBenhNhan,
							TrangThai:2,
							Call_SCOPE_IDENTITY:data.Call_SCOPE_IDENTITY,
							SoQuay:data.SoQuay
							
						});

		}
		else
		{
			socket.broadcast.emit("goiloa", data);	
		}
	});
		socket.on('pusher4100', function (data) {	
		
				pusher.trigger('my-channel', 'my-event', {
		  "message": data.TenBenhNhan,
		  "ListTiepNhanId":data.ListTiepNhanId

		});
		socket.broadcast.emit("pusher4900", data);	
		//socket.broadcast.emit("goiloa", data);	
		console.log('pusher4100 '+data.TenBenhNhan+"-- "+data.TenPhongBan+"-phongbanID-"+data.ListTiepNhanId);
		
	})

})

	



