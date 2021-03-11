/*cấu hình mail*/
const format = require("node.date-time");
console.log(' on '+new Date().format("y-M-d H:m:SS") );
var nodemailer = require('nodemailer');
let transporter = nodemailer.createTransport({
	     service: '"Outlook365"', // no need to set host or port etc.
	     port: 587,
	     secure: true,
	     auth: {
	         user: 'lichhmdn@hoanmy.com',
	         pass: 'Tmk@541981'
	     }
});
/*cấu hình mail*/


/*Cấu hình sql*/
var sql = require('mssql');
var cf = require('./configSql');
var config = cf.config;
var mang='';
/*Cấu hình sql lấy nhân viên và log chấm công nhắc nhở*/


/*Lịch gởi mail*/
var schedule = require('node-schedule');
var sendEmail = schedule.scheduleJob('0 15 5 ? * *', function(){
   //console.log('do on..'+new Date());
   ScanLogAndSendMail ();
});
/*Lịch gởi mail*/



/*Hàm lấy dữ liệu*/
function ScanLogAndSendMail () {
		var dem=0;
	var connection = new sql.Connection(config, function(err) {
	if(err === null) {	// keets noois thành công
		var request = new sql.Request(connection);
    request.execute('[DM_nhanvien_hotenphongban]', function(err, recordsets, returnValue) {
		if(err === undefined){//ko lỗi
			mang = recordsets[0];// có dữ liệu
			if(mang.length>0){
				for(var i=0;i<mang.length;i++){
					mangtam=mang[i];
					if(mangtam["Email"]){
						console.log(" STT "+ (i+1) +" -họ tên- "+mangtam["hoten"]+" -- "+mangtam["TenPhongBan"]+ "-Email- "+mangtam["Email"]);
						var cur=new Date();
						dem++;
						let mailOptions = {
						  from: 'lichhmdn@hoanmy.com',
						  to: mangtam["Email"],
						  cc:mangtam["EmailCC"],
						  subject:'Thông báo hàng ngày từ Lịch HMĐN',
						  attachments: [{
						        filename: 'footer-image-mail.png',
						        path: './footer-image-mail.png',
						        cid: 'unique@kreata.ee' //same cid value as in the html img src
						    }],
          				html: "<table><tr><th>Họ Tên</th><th>Ngày</th><th>Lịch</th><th>Log chấm</th></tr>"
          				+"<tr style='border:1px solid  black;'>"
          					+"<td style='border:1px solid  black;'>"+mangtam['hoten']+"</td>"
          					+"<td style='border:1px solid  black;'>"+mangtam['Ngay']+"</td>"
          					+"<td style='border:1px solid  black;'>"+mangtam['Lich']+"</td>"
          					+"<td style='border:1px solid  black;'>"+mangtam['Logs']+"</td>"
          				+"</tr>"
          				+"</table>"
    					+"P/S: <i>Đây là email tự động từ Hệ thống QL Lịch Chấm Công HMDN,"
	          				+"Anh/Chị vui lòng không reply / This email was generated automatically from HM Purchasing Tracking system, please do not reply</i>"
							+"<br>_______________________________________________"
							+"<br><img src='cid:unique@kreata.ee'/>"
							+"<br>HOAN MY DANANG QUẢN LÝ LỊCH CHẤM CÔNG"
							+"<br>11th Floor Block C. 291 Nguyen Van Linh st., Thac Gian Ward, Thanh Khe Dist, Danang, Vietnam"
							+"<br>Tel: (+84) 236 3650 676"
							+"<br>Email: lichhmdn@hoanmy.com"
						};

						transporter.sendMail(mailOptions, function(error, info){
						  if (error) {
						    console.log("--------"+error);
						  } else {
						    console.log('Email sent 1 h: ' + info.response + '\n'+'info'+info.messageId);
						  }
						});


						}else{
							console.log(" STT "+ (i+1) +" -họ tên- "+mangtam["hoten"]+" -- "+mangtam["TenPhongBan"]+ "-Email-chưa cấu hình"+mangtam["Email"]);

						}
					}
			}
			connection.close();
		}else{
				console.log("ko co du lieu");
				connection.close();
			}
		});
		}else{
			connection.close();
		}
	});
}
