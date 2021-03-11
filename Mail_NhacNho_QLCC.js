/*cấu hình mail*/
const format = require("node.date-time");
console.log(' on '+new Date().format("y-M-d H:m:SS") );
var nodemailer = require('nodemailer');
var transporter = nodemailer.createTransport({
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
//lịch gởi lúc 
var ontime='0 18 8 ? * *';
var sendEmail = schedule.scheduleJob(ontime, function(){
    //ScanLogAndSendMail ();
});

/*Lịch gởi mail*/
ScanLogAndSendMail ();

    
/*Hàm lấy dữ liệu*/
function ScanLogAndSendMail () {
    var connection = new sql.Connection(config, function(err) {
    if(err === null) {  // keets noois thành công
        var request = new sql.Request(connection);
     //   request.input('ID_NhanVien', sql.Int,1654);
     //   request.input('ID_PhongBan', sql.Int,140);
      //  request.input('ngay', sql.VarChar(10),'20200928');
        request.execute('[QLCC_DS_Mail]', function(err, recordsets, returnValue) {
        if(err === undefined){//ko lỗi
            mang = recordsets[0];// có dữ liệu
            if(mang.length>0){
                for(var i=0;i<mang.length;i++){
                    mangtam=mang[i];
                    if(mangtam["Email"]){     
                        
                        let bodyMail_NhacNhoCuoiThang= 
                        "Kính gởi các Anh/Chị.<br>Hệ thống Quản lý lịch và log chấm công vân tay HMĐN gởi đến Anh/Chị thông tin sau: <br>"
                        +"Vui lòng kiểm tra lại lịch làm việc trong tháng của Khoa/Phòng/ Bộ phận mà anh chị đang quản lý "
                        +"và duyệt nội dung bảng chấm công BC.1 vào cuối tháng(nhấn vào nút 'chưa duyệt' để duyệt gởi bảng chấm công)<br>"
                       // +"<br><img src='cid:hinh2'/>"
                        +"Sau khi duyệt , các anh chị đã chính thức gởi bảng công đến phòng nhân sự.<br>"
                        +"Trân trọng cảm ơn.<br>"
                       // +"<br><img src='cid:hinh3'/>"
                        +"Link vào phần mềm quản lý lịch làm việc: http://10.22.10.22/hmdntool<br>"
                        +"P/S: <i style='color:blue'>Email này tự động gởi từ Hệ thống QL Lịch Chấm Công HMDN,"
                        +" Anh/Chị vui lòng không reply/ This email was generated automatically from HM Calendar Log Tracking System,"
                        +" Please do not reply.</i>"
                       // +"("+i+")"
                        +"<br>__________________________________________"
                        +"<br><img src='cid:hinh1'/>"
                        +"<br>HOAN MY DANANG QUẢN LÝ LỊCH CHẤM CÔNG"
                        +"<br>12th Floor Block C. 291 Nguyen Van Linh St., Thac Gian Ward, Thanh Khe Dist, Danang, Vietnam"
                        +"<br>Tel: (+84) 236 3650 676"
                        +"<br>Email: lichhmdn@hoanmy.com";
                        console.log( mangtam["Email"]+'-------'+mangtam["EmailCC"]);
                        let mailOptions = {
                          from: 'lichhmdn@hoanmy.com',
                          to: mangtam["Email"],
                          cc:mangtam["EmailCC"]+';kha.ta@hoanmy.com',
                          subject:'Demo Thông báo từ Hệ Thống Quản Lý Lịch và Log Chấm Công HMĐN',
                          attachments: [{
                                filename: 'footer-image-mail.png',
                                path: './footer-image-mail.png',
                                cid: 'hinh1' //same cid value as in the html img src
                            },
                            {
                                filename: 'chuaduyetcong.png',
                                path: './chuaduyetcong.png',
                                cid: 'hinh2' //same cid value as in the html img src
                            },
                            {
                                filename: 'daduyetcong.png',
                                path: './daduyetcong.png',
                                cid: 'hinh3' //same cid value as in the html img src
                            },
                        ],
                        html:bodyMail_NhacNhoCuoiThang
                        };

                        transporter.sendMail(mailOptions, function(error, info){
                          if(error){
                              console.log("--errors---"+error);
                          }else{
                            console.log('Email sent everday on '+ ontime+'--'+ info.response + '\n'+'info'+info.messageId);
                          }
                        });

                        }
                        else{console.log(" STT "+ (i+1) +" -họ tên- "+mangtam["hoten"]+" -- "+mangtam["TenPhongBan"]+ "-Email-chưa cấu hình"+mangtam["Email"]);
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
