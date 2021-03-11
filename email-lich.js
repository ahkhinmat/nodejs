var schedule = require('node-schedule');
/*var nodemailer = require('nodemailer');
   console.log("---begin--");
let transporter = nodemailer.createTransport({
		     service: '"Outlook365"', // no need to set host or port etc.
		     port: 587,
		     secure: true,
		     auth: {
		         user: 'lichhmdn@hoanmy.com',
		         pass: 'Tmk@541981'
		     }
		});
  var mailOptions = {
		  from: 'lichhmdn@hoanmy.com',
		   to: 'kha.ta@hoanmy.com,ta.minhkha@gmail.com,anh.phan@hoanmy.com',
		  subject:cur+' 30mi Thông báo schedule Lịch HMDN',
		  text: ' 1 h Lịch đã thay đổi!'
		};

	transporter.sendMail(mailOptions, function(error, info){
		  if (error) {
		    console.log("--------"+error);
		  } else {
		    console.log('Email sent 1 h: ' + info.response + '\n'+'info'+info.messageId);
		  }
		});*/

//var schedule = require('node-schedule');
var sendEmail = schedule.scheduleJob('*/1 * * * *', function(){
   console.log('do on..'+new Date());
});
