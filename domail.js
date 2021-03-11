   
   var sql = require('mssql');
   var cf = require('./config');
   var config = cf.config;
   var mang='';
   function loadDS () {	
	var connection = new sql.Connection(config, function(err) {
		if (err === null) {		


			var request = new sql.Request(connection);
			request.input('option', sql.VarChar(10),'a');
			  request.execute('[QLCC_ViewTrackingLich]', function(err, recordsets, returnValue) {
				if(err === undefined){
					mang = recordsets[0];
					if(mang.length>0){
						for(var i=0;i<mang.length;i++){							
										mangtam=mang[i];	
						
										console.log('sovaovien '+mangtam["SoVaoVien"] + '\n');
						
									}	
					}



					connection.close();
					
				}else{
					connection.close();
					//loadDS();
				}
			});
		}else{
			connection.close();
		//	loadDS();

		}
	});	
}
loadDS();


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

   var cur=new Date();
		var altBody='<br>Anh/Chị nhấn vào đây để xem chi tiết'
		+' http://10.22.10.22/hmdntool/index.php.<br>Trân trọng.<br>'
		+'P/S: <i>Email này tự động gửi từ hệ thống quản lý lịch làm việc Hoàn Mỹ Đà Nẵng,'
		+' Anh/Chị vui lòng không reply<br>'
		+' This email was generated automatically from HM Calendar'
		+ 'System, please do not reply</i>';

		var footer='<div style="color:green;font-size:15px"> Hoan My® Danang Hospital</div>'
		//+'<br><div >___________________________________________________</div>'
		+'<br><img src="cid:unique@kreata.ee"/>'
		+'<br>HỆ THỐNG QUẢN LÝ LỊCH HOÀN MỸ ĐÀ NẴNG'
		+'<br>HOAN MY DANANG CALENDAR SYSTEM'
		+'<br>12th Floor Block C. 291 Nguyen Van Linh st., Thac Gian Ward, Thanh Khe Dist, Danang, Vietnam'
		+'<br>Tel: (+84) 236 3650 676'
		+'<br>Fax: (+84) 236 3650 272' 
		+'<br>Email: lichhmdn@hoanmy.com' ;	
   var mailOptions = {
		  from: 'lichhmdn@hoanmy.com',
		  to: 'kha.ta@hoanmy.com,anh.phan@hoanmy.com',
		  subject:cur+'Thông báo schedule Lịch HMDN',
		  text: 'Lịch đã thay đổi!',
		  html: altBody +footer,
		    attachments: [{
		       // filename: 'footer-image-mail.png',
		        path:  __dirname +'/images/footer-image-mail.png',
		        cid: 'unique@kreata.ee' //same cid value as in the html img src
		    }]
		};

		transporter.sendMail(mailOptions, function(error, info){
		  if (error) {
		    console.log("--------"+error);
		  } else {
		    console.log('Email sent: ' + info.response + '\n'+'info'+info.messageId);
		  }
		}); 	
