/*cấu hình mail*/
const format = require("node.date-time");
console.log(' on '+new Date().format("y-M-d H:m:SS") );
var nodemailer = require('nodemailer');
// var transporter = nodemailer.createTransport({
//              service: '"gmail"', // no need to set host or port etc.
//              port: 465,
//              secure: true,
//              auth: {
//                  user: 'thongbaohmdn@gmail.com',
//                  pass: 'qaaO6RK8oBPySMwE'
//              }
//         });
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
var cf = require('../configSql');
var config = cf.config;
var mang='';
/*Cấu hình sql lấy nhân viên và log chấm công nhắc nhở*/


/*Lịch gởi mail*/
var schedule = require('node-schedule');
//lịch gởi lúc 
var ontime='0 44 8 ? * *';
var sendEmail = schedule.scheduleJob(ontime, function(){
    ScanLogAndSendMail ();
});

/*Lịch gởi mail*/
ScanLogAndSendMail ();

    
/*Hàm lấy dữ liệu*/
function ScanLogAndSendMail () {
    var connection = new sql.Connection(config, function(err) {
    if(err === null) {  // keets noois thành công
        var request = new sql.Request(connection);
        request.execute('[CC_TestMail]', function(err, recordsets, returnValue) {
        if(err === undefined){//ko lỗi
            mang = recordsets[0];// có dữ liệu
            if(mang.length>0){
            var i=0;
                mang.forEach(function (mangtam) {
                    i++;
                        let bodyMail= "Kính gởi các Anh/Chị.<br>Hệ thống Quản lý lịch và log chấm công vân tay HMĐN gởi đến Anh/Chị thông tin sau<br>"
                       
                        +"P/S: <i style='color:blue'>Email này tự động gởi từ Hệ thống QL Lịch Chấm Công HMDN,"
                        +" Anh/Chị vui lòng không reply/ This email was generated automatically from HM Calendar Log Tracking System,"
                        +" Please do not reply.</i>"
                        +"<br>__________________________________________"
                        +"<br><img src='cid:unique@kreata.ee'/>"
                        +"<br>HOAN MY DANANG QUẢN LÝ LỊCH CHẤM CÔNG"
                        +"<br>12th Floor Block C. 291 Nguyen Van Linh St., Thac Gian Ward, Thanh Khe Dist, Danang, Vietnam"
                        +"<br>Tel: (+84) 236 3650 676"
                        +"<br>Email: lichhmdn@hoanmy.com";
                    var msg = {
                          from:'lichhmdn@hoanmy.com',
                          cc:'kha.ta@hoanmy.com',
                          subject: i+ "Hello ✔", // Subject line
                          text: "-Hello This is an auto generated Email for testing  from node please ignore it  ✔", // plaintext body
                          html:bodyMail
                      }
                                    msg.to=mangtam["Email"];
                                    try{
                                            transporter.sendMail(msg, function(error, info){
                                                if(error){
                                                    console.log("--send mail errors---:"+mangtam["HoTen"]+error);
                                                }else{
                                                    console.log('success -- '+ info.response + '\n'+'info'+info.messageId);
                                                }
                                            });  
                                        }catch(error){
                                            console.log(error);
                                        }
                });
        

                //mang.forEach(element => console.log(element['Email']));
                
                // for(var i=0;i<mang.length;i++){
                //     mangtam=mang[i];
                //     if(mangtam["Email"]){     
                //         let bodyMail= "Kính gởi các Anh/Chị.<br>Hệ thống Quản lý lịch và log chấm công vân tay HMĐN gởi đến Anh/Chị thông tin sau<br>"
                //         +"<table border='1'><tr><th>Mã SC</th><th>Mã NV</th><th>Họ Tên</th><th>Ngày</th><th>Mã chấm công</th><th>Lịch</th><th>Chấm lúc</th><th>Ghi chú</th></tr>"
                //         +"<tr style='border:1px solid  black;'>"
                //             +"<td style='border:1px solid  black;text-align:center'>"+mangtam['AutoID']+"</td>"
                //             +"<td style='border:1px solid  black;text-align:center'>"+mangtam['MaNV']+"</td>"
                //             +"<td style='border:1px solid  black;text-align:center'>"+mangtam['HoTen']+"</td>"
                //             +"<td style='border:1px solid  black;text-align:center'>"+mangtam['Ngay']+"</td>"
                //             +"<td style='border:1px solid  black;text-align:center'>"+mangtam['KyHieuThoiLuongCong']+"</td>"
                //              +"<td style='border:1px solid  black;text-align:center'>"+mangtam['CaLamViec']+"</td>"
                //             +"<td style='border:1px solid  black;text-align:center'>"+mangtam['LogChamCong']+"</td>"
                //             +"<td style='border:1px solid  black;text-align:center'>"+mangtam['KieuChamSai']+"</td>"
                //         +"</tr>"
                //         +"</table><br>"
                //         +"P/S: <i style='color:blue'>Email này tự động gởi từ Hệ thống QL Lịch Chấm Công HMDN,"
                //         +" Anh/Chị vui lòng không reply/ This email was generated automatically from HM Calendar Log Tracking System,"
                //         +" Please do not reply.</i>"
                //         +"("+i+")"
                //         +"<br>__________________________________________"
                //         +"<br><img src='cid:unique@kreata.ee'/>"
                //         +"<br>HOAN MY DANANG QUẢN LÝ LỊCH CHẤM CÔNG"
                //         +"<br>12th Floor Block C. 291 Nguyen Van Linh St., Thac Gian Ward, Thanh Khe Dist, Danang, Vietnam"
                //         +"<br>Tel: (+84) 236 3650 676"
                //         +"<br>Email: lichhmdn@hoanmy.com";

                //         let bodyMail_NhacNhoCuoiThang= "Kính gởi các Anh/Chị.<br>Hệ thống Quản lý lịch và log chấm công vân tay HMĐN gởi đến Anh/Chị thông tin sau<br>"
                       
                //         +"P/S: <i style='color:blue'>Email này tự động gởi từ Hệ thống QL Lịch Chấm Công HMDN,"
                //         +" Anh/Chị vui lòng không reply/ This email was generated automatically from HM Calendar Log Tracking System,"
                //         +" Please do not reply.</i>"
                //         +"("+i+")"
                //         +"<br>__________________________________________"
                //         +"<br><img src='cid:unique@kreata.ee'/>"
                //         +"<br>HOAN MY DANANG QUẢN LÝ LỊCH CHẤM CÔNG"
                //         +"<br>12th Floor Block C. 291 Nguyen Van Linh St., Thac Gian Ward, Thanh Khe Dist, Danang, Vietnam"
                //         +"<br>Tel: (+84) 236 3650 676"
                //         +"<br>Email: lichhmdn@hoanmy.com";
                //         //console.log("STT--"+i+"--"+bodyMail);
                //         let mailOptions = {
                //           from: 'lichhmdn@hoanmy.com',
                //           to: mangtam["Email"],
                //           cc:'kha.ta@hoanmy.com',
                //           subject:i+'Demo Thông báo từ Hệ Thống Quản Lý Lịch và Log Chấm Công HMĐN',
                //           attachments: [{
                //                 filename: 'footer-image-mail.png',
                //                 path: '../footer-image-mail.png',
                //                 cid: 'unique@kreata.ee' //same cid value as in the html img src
                //             }],
                //         html:bodyMail
                //         };
                //             try{
                //                 transporter.sendMail(mailOptions, function(error, info){
                //                     if(error){
                //                         console.log("--send mail errors---:"+mangtam["HoTen"]+error);
                //                     }else{
                //                         console.log('success -- '+ info.response + '\n'+'info'+info.messageId);
                //                     }
                //                 });  
                //             }catch(error){
                //                 console.log(error);
                //             }
                            

                //     }
                //     else{console.log(" STT "+ (i+1) +" -họ tên- "+mangtam["hoten"]+" -- "+mangtam["TenPhongBan"]+ "-Email-chưa cấu hình"+mangtam["Email"]);
                //     }
                //     }
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
