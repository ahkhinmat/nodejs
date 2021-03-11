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
                 pass: 'Tmk@541981@'
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
var sendEmail = schedule.scheduleJob('0 33 8 ? * *', function(){
    ScanLogAndSendMail ();
});

/*Lịch gởi mail*/



/*Hàm lấy dữ liệu*/
function ScanLogAndSendMail () {
        var dem=0;
    var connection = new sql.Connection(config, function(err) {
    if(err === null) {  // keets noois thành công
        var request = new sql.Request(connection);
     //   request.input('ID_NhanVien', sql.Int,1654);
     //   request.input('ID_PhongBan', sql.Int,140);
      //  request.input('ngay', sql.VarChar(10),'20200928');
        request.execute('[QLCC_GetLogToEmail_KHTH]', function(err, recordsets, returnValue) {
        if(err === undefined){//ko lỗi
            mang = recordsets[0];// có dữ liệu
            if(mang.length>0){
                for(var i=0;i<mang.length;i++){
                    mangtam=mang[i];
                    if(mangtam["Email"]){
                       
                        var cur=new Date();
                        dem++;
                        let mailOptions = {
                          from: 'lichhmdn@hoanmy.com',
                          to: mangtam["Email"],
                          cc:mangtam["EmailTP"],
                          //cc:'kha.ta@hoanmy.com',
                          subject:'Demo Thông báo từ Hệ Thống Quản Lý Lịch và Log Chấm Công HMĐN',
                          attachments: [{
                                filename: 'footer-image-mail.png',
                                path: './footer-image-mail.png',
                                cid: 'unique@kreata.ee' //same cid value as in the html img src
                            }],
                        html: "Kính gởi các Anh/Chị.<br>Hệ thống Quản lý lịch và log chấm công vân tay HMĐN gởi đến Anh/Chị thông tin sau<br>"
                        +"<table border='1'><tr><th>Mã NV</th><th>Họ Tên</th><th>Ngày</th><th>Mã chấm công</th><th>Lịch</th><th>Chấm lúc</th><th>Ghi chú</th></tr>"
                        +"<tr style='border:1px solid  black;'>"
                            +"<td style='border:1px solid  black;text-align:center'>"+mangtam['MaNV']+"</td>"
                            +"<td style='border:1px solid  black;text-align:center'>"+mangtam['HoTen']+"</td>"
                            +"<td style='border:1px solid  black;text-align:center'>"+mangtam['Ngay'].format("dd/MM/y")+"</td>"
                            +"<td style='border:1px solid  black;text-align:center'>"+mangtam['KyHieuThoiLuongCong']+"</td>"
                             +"<td style='border:1px solid  black;text-align:center'>"+mangtam['CaLamViec']+"</td>"
                            +"<td style='border:1px solid  black;text-align:center'>"+mangtam['LogChamCong']+"</td>"
                            +"<td style='border:1px solid  black;text-align:center'>"+mangtam['KieuChamSai']+"</td>"
                        +"</tr>"
                        +"</table><br>"
                        +"P/S: <i style='color:blue'>Email này tự động gởi từ Hệ thống QL Lịch Chấm Công HMDN,"
                        +" Anh/Chị vui lòng không reply/ This email was generated automatically from HM Calendar Log Tracking System,"
                        +" Please do not reply.</i>"
                        +"<br>__________________________________________"
                        +"<br><img src='cid:unique@kreata.ee'/>"
                        +"<br>HOAN MY DANANG QUẢN LÝ LỊCH CHẤM CÔNG"
                        +"<br>12th Floor Block C. 291 Nguyen Van Linh St., Thac Gian Ward, Thanh Khe Dist, Danang, Vietnam"
                        +"<br>Tel: (+84) 236 3650 676"
                        +"<br>Email: lichhmdn@hoanmy.com"
                        };


                        transporter.sendMail(mailOptions, function(error, info){
                          if (error) {
                            console.log("--errors---:"+mangtam["HoTen"]+error);
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
