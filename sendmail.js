
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


var mailOptions = {
  from: 'lichhmdn@hoanmy.com',
  to: 'kha.ta@hoanmy.com,ta.minhkha@gmail.com,anh.phan@hoanmy.com,tuyen.ho@hoanmy.com',
  subject: 'Demo Thông báo Lịch HMDN',
  text: 'Lịch đã thay đổi!'
};

transporter.sendMail(mailOptions, function(error, info){
  if (error) {
    console.log("--------"+error);
  } else {
    console.log('Email sent: ' + info.response + '\n'+'info'+info.messageId);
  }
}); 
