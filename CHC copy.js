/*cấu hình time*/
const format = require("node.date-time");
console.log(' on '+new Date().format("H:m:SS") );

var fs = require('fs');

/*cấu hình time*/

/*Cấu hình mssql*/
var sql = require('mssql');
var cf = require('./configSql2');
var config = cf.config;
var mang='';
/*Cấu hình sql */



/* Cấu hình mysql*/
var mysql = require('mysql');
// var connection_mysql = mysql.createConnection({
//     host: "auth-db148.hostinger.com",
//     user: "u469175357_root",
//     password: "Tmk@541981",
//     database: "u469175357_CHC"
// });
var connection_mysql = mysql.createConnection({
    host: "127.0.0.1",
    user: "root",
    password: "",
    database: "elaravel"
});
connection_mysql.connect();
/**
 * hết cấu hình mysql
 */

GetDataReportHis_DMBN ();
function PushToMySQL_DMBN(benhnhan_id,mayte,tenbenhnhan,diachi,gioitinh,namsinh,ngaysinh){
       var post  = {
                            BenhNhan_Id:benhnhan_id,
                            MaYte:mayte,
                            TenBenhNhan: tenbenhnhan,
                            DiaChi:diachi,
                            GioiTinh:gioitinh,
                            NamSinh:namsinh,
                            NgaySinh:ngaysinh
                         };
        var query = connection_mysql.query('INSERT INTO ksk_dm_benhnhan SET ?', post, function (error, results, fields) {
            if (error) {
                console.log('PushToMySQL_DMBN   lỗi insert vào table ksk_dm_benhnhan:'+error); 
            }
            else{
                console.log(query.sql); 
            }
        });
        var post2  = {
            MaYte:mayte,
            MatKhau:'123'
           
         };
        var query2 = connection_mysql.query('INSERT INTO ksk_users SET ?', post2, function (error, results, fields) {
            if (error) {
                console.log('PushToMySQL_DMBN  lỗi insert vào table ksk_users:'+error); 
            }
            else{
                console.log(query.sql); 
            }
        });
        
}
function PushToMySQL_HD(HopDong_ID,	So_HD,NgayHieuLuc_HD,TenCongTy,NgayTao_HD){
    var post  = {
                        HopDong_ID:HopDong_ID,
                         So_HD: So_HD,
                         NgayHieuLuc_HD:NgayHieuLuc_HD,
                         TenCongTy:TenCongTy,
                         NgayTao_HD:NgayTao_HD,
                      };
     var query = connection_mysql.query('INSERT INTO ksk_hopdong SET ?', post, function (error, results, fields) {
         if (error) {
             console.log('lỗi insert mysql'+ error); 
         }
         else{
             console.log(query.sql); 
         }
     });     
}
function PushToMySQL_MapHD_BN(Autoid_His,HopDong_ID,BenhNhan_ID,STT,NgayTao){
    var post  = {
                        Autoid_His:Autoid_His,
                        HopDong_ID: HopDong_ID,
                        BenhNhan_ID:BenhNhan_ID,
                        STT:STT,
                        NgayTao:NgayTao
                      };
     var query = connection_mysql.query('INSERT INTO ksk_hopdong_benhnhan SET ?', post, function (error, results, fields) {
         if (error) {
             console.log('lỗi insert mysql'+ error); 
         }
         else{
             console.log(query.sql); 
         }
     });     
}
function PushToMySQL_KetQua(BenhNhan_Id,HopDong_Id,	YeuCauChiTiet_Id,DichVu_Id,NgayTaoHis,NhomDichVu_ID,TenDichVu,JsonKetQua,
    TenNhomDichVu,MaNhomDichVu,PhanLoai,TieuDe,NgayKetQua){
    var post  = {
                        BenhNhan_Id:BenhNhan_Id,
                        HopDong_Id: HopDong_Id,
                        YeuCauChiTiet_Id:YeuCauChiTiet_Id,
                        DichVu_Id:DichVu_Id,
                        NgayTaoHis:NgayTaoHis,
                        NhomDichVu_ID:NhomDichVu_ID,
                        TenDichVu:TenDichVu,
                        JsonKetQua:JsonKetQua,
                        TenNhomDichVu:TenNhomDichVu,
                        MaNhomDichVu:MaNhomDichVu,
                        PhanLoai:PhanLoai,
                        TieuDe:TieuDe,  
                        NgayKetQua:NgayKetQua,  
                      };
     var query = connection_mysql.query('INSERT INTO ksk_ketqua SET ?', post, function (error, results, fields) {
         if (error) {
             console.log('lỗi insert mysql'+ error); 
         }
         else{
             console.log(query.sql); 
         }
     });     
}
/*Hàm lấy dữ liệu từ CHC HIS*/

/*[CHC_GetKetQuaXN]*/
function PushToMySQL_KetQuaXN(STT,
    NhomDichVu_Id,
    MaDichVu,
    KetQua,
    DonViTinh,
    BatThuong,
    BSKetLuan,
    TenGroupCap2,
    TenGroup,
    NoiDung,
    NhomNoiDung,
    CSBT,
    CLSYeuCau_Id,
    TenBenhNhan,
    SoVaoVien,
    BenhNhan_Id,
    HopDong_Id,
    NgayGioThucHien,
    SoPhieu,
    TenDichVu,
    DichVu_Id){
                var post  = {
                    STT:STT,
                    NhomDichVu_Id: NhomDichVu_Id,
                    MaDichVu:MaDichVu,
                    KetQua:KetQua,
                    DonViTinh:DonViTinh,
                    BatThuong:BatThuong,
                    BSKetLuan:BSKetLuan,
                    TenGroupCap2:TenGroupCap2,
                    TenGroup:TenGroup,
                    NoiDung:NoiDung,
                    NhomNoiDung:NhomNoiDung,
                    CSBT:CSBT,
                    CLSYeuCau_Id:CLSYeuCau_Id,
                    TenBenhNhan:TenBenhNhan,
                    SoVaoVien:SoVaoVien,
                    BenhNhan_Id:BenhNhan_Id,
                    HopDong_Id:HopDong_Id,
                    NgayGioThucHien:NgayGioThucHien,
                    SoPhieu:SoPhieu,
                    TenDichVu:TenDichVu,
                    DichVu_Id:DichVu_Id,
                   
                  };
 var query = connection_mysql.query('INSERT INTO ksk_ketqua_xetnghiem SET ?', post, function (error, results, fields) {
     if (error) {
         console.log('lỗi insert mysql'+ error); 
     }
     else{
         console.log(query.sql); 
     }
 });   

}
function PushToMySQL_KetQua_TuVan(
    KetLuan,
	TenDichVu,
	MaNhomDichVu,
	BenhNhan_Id,
	TenNhomDichVu ,
	NhomDichVu_Id,
	KetLuan_Text,
	NhanXet_Text,
	XepLoai,
	MaYte ,
	TenBenhNhan,
	PhanLoaiSucKhoe,
	HopDong_Id ,
    STT,
    LoaiDichVu_Id,CanNang,ChieuCao,BMI,Mach,HuyetAp
){
    var post  = {
        KetLuan:KetLuan,
        TenDichVu:TenDichVu,
        MaNhomDichVu:MaNhomDichVu,
        BenhNhan_Id:BenhNhan_Id,
        TenNhomDichVu:TenNhomDichVu,
        NhomDichVu_Id:NhomDichVu_Id,
        KetLuan_Text:KetLuan_Text,
        NhanXet_Text:NhanXet_Text,
        XepLoai:XepLoai,
        MaYte:MaYte,
        TenBenhNhan:TenBenhNhan,
        PhanLoaiSucKhoe:PhanLoaiSucKhoe,
        HopDong_Id:HopDong_Id,
        STT:STT,
        LoaiDichVu_Id:LoaiDichVu_Id,
        CanNang:CanNang,
        ChieuCao:ChieuCao,
        BMI: BMI,
        Mach:Mach,
        HuyetAp:HuyetAp
      };
var query = connection_mysql.query('INSERT INTO ksk_ketqua_tuvan SET ?', post, function (error, results, fields) {
if (error) {
console.log('lỗi insert mysql ksk_ketqua_tuvan'+ error); 
}
else{
console.log(query.sql); 
}
});   

}
function PushToMySQL_Thuoc(
    BenhNhan_Id, 
    NgayKham,
    TenDichVu, 
    HopDong_Id, 
    ChanDoan, 
    LoiDan, 
    Duoc_Id, 
    TenDuocDayDu, 
    Sang, 
    Trua, 
    Chieu, 
    Toi,
    DuongDung, 
    SoToa,
    TenBacSyKham,
    SoNgay
){
    var post  = {
        BenhNhan_Id: BenhNhan_Id,
        NgayKham:NgayKham,
        TenDichVu: TenDichVu,
        HopDong_Id: HopDong_Id,
        ChanDoan: ChanDoan,
        LoiDan: LoiDan,
        Duoc_Id: Duoc_Id,
        TenDuocDayDu: TenDuocDayDu,
        Sang: Sang,
        Trua: Trua,
        Chieu: Chieu,
        Toi:Toi,
        DuongDung: DuongDung,
        SoToa:SoToa,
        TenBacSyKham:TenBacSyKham,
        SoNgay:SoNgay
      };
    var query = connection_mysql.query('INSERT INTO ksk_toathuoc SET ?', post, function (error, results, fields) {
    if (error) {
    console.log('lỗi insert mysql ksk_toathuoc'+ error); 
    }
    else{
    console.log(query.sql); 
    }
    });   

}

/** end [CHC_GetKetQuaXN]*/
function GetDataReportHis_DMBN () {
    var connection = new sql.Connection(config, function(err) {
    if(err === null) {  // keets noois thành công
        var request = new sql.Request(connection);

// /* CHC_GetBN*/
//         request.input('HopDong_Id', sql.Int,1930);
//         request.execute('[CHC_GetBN]', function(err, recordsets, returnValue) {
//         if(err === undefined){//ko lỗi
//             mang = recordsets[0];// có dữ liệu
//             if(mang.length>0){
//                 for(var i=0;i<mang.length;i++){
//                     mangtam=mang[i];
//                     PushToMySQL_DMBN(
//                         mangtam ["BenhNhan_Id"],
//                         mangtam["MaYte"],
//                         mangtam["TenBenhNhan"],
//                         mangtam["DiaChi"],
//                         mangtam["GioiTinh"],
//                         mangtam["NamSinh"],
//                         mangtam["NgaySinh"]
//                         );
//                     }
//             }
//            // connection.close();
//         }else{
//                 console.log("ko co du lieu CHC_GetBN");
//               //  connection.close();
//             }
//         });
// // /*End CHC_GetBN*/

//         // /**CHC_GetHopDong DM Hợp đồng */
//         var mang2='';
//         request.input('HopDong_Id', sql.Int,1930);
//         request.execute('[CHC_GetHopDong]', function(err, recordsets, returnValue) {
//             if(err === undefined){//ko lỗi
//                 mang2 = recordsets[0];// có dữ liệu
//                 if(mang2.length>0){
//                     console.log('ok'+ mang2.length);
//                     for(var i=0;i<mang2.length;i++){
//                         mangtam=mang2[i];
//                         PushToMySQL_HD(
//                             mangtam ["HopDong_ID"],
//                             mangtam["So_HD"],
//                             mangtam["NgayHieuLuc_HD"],
//                             mangtam["TenCongTy"],
//                             mangtam["NgayTao_HD"],
//                             );
//                     }
//                 }
//             }else{
//                     console.log("ko co du lieu  CHC_GetHopDong");
//                 }
//             });
//         // //       /**End CHC_GetHopDong DM Hợp đồng */


//             // /**CHC_GetMapHD_BN
//             //  */
//             var mang3='';
//             request.execute('[CHC_GetMapHD_BN]', function(err, recordsets, returnValue) {
//                 if(err === undefined){//ko lỗi
//                     mang3 = recordsets[0];// có dữ liệu
//                     if(mang3.length>0){
                  
//                         for(var i=0;i<mang3.length;i++){
//                             mangtam=mang3[i];
//                                 PushToMySQL_MapHD_BN(
//                                 mangtam ["Autoid_His"],
//                                 mangtam["HopDong_ID"],
//                                 mangtam["BenhNhan_ID"],
//                                 mangtam["STT"],
//                                 mangtam["NgayTao"],
//                                 );
//                         }
//                     }
//                 }else{
//                         console.log("ko co du lieu  CHC_GetMapHD_BN");
//                     }
//                 });

//             // /**END CHC_GetMapHD_BN */

//                 /**CHC_GetKetQua
//              */

            // var mang4='';
            // request.input('HopDong_Id', sql.Int,1930);
            // request.execute('[CHC_GetKetQua]', function(err, recordsets, returnValue) {
            //     if(err === undefined){//ko lỗi
            //         mang4 = recordsets[0];// có dữ liệu
            //         if(mang4.length>0){
            //             var countImages=0;
            //             for(var i=0;i<mang4.length;i++){
            //                 mangtam=mang4[i];
            //                  console.log(i+"-YeuCauChiTiet_Id-"+mangtam["YeuCauChiTiet_Id"]+ "-BenhNhan_Id-" +mangtam["BenhNhan_Id"]);
                          
            //                 if(mangtam["JsonKetQua"]){
            //                     try {
            //                         const obj = JSON.parse(mangtam["JsonKetQua"]);
                                  
            //                             if(obj.Images){
            //                                 for (let index = 0; index < obj.Images.length; index++) {
            //                                     countImages++;
            //                                     console.log(obj.Images[index]["PathLink"]);
            //                                     fs.createReadStream(obj.Images[index]["PathLink"]).pipe(fs.createWriteStream('./hinh_cls/'+(obj.Images[index]["File_Name"])));
            //                                 }
            //                              }
            //                     } catch (error) {
            //                         console.log("not JSON"+error);
            //                     }
                            
            //                 }         
            //                 console.log("countImages "+countImages);
            //                 PushToMySQL_KetQua(
            //                     mangtam ["BenhNhan_Id"],
            //                     mangtam["HopDong_Id"],
            //                     mangtam["YeuCauChiTiet_Id"],
            //                     mangtam["DichVu_Id"],
            //                     mangtam["NgayTaoHis"],
            //                     mangtam["NhomDichVu_ID"],
            //                     mangtam["TenDichVu"],
            //                     mangtam["JsonKetQua"], 
            //                     mangtam["TenNhomDichVu"], 
            //                     mangtam["MaNhomDichVu"],
            //                     mangtam["PhanLoai"],       
            //                     mangtam["TieuDe"], 
            //                     mangtam["NgayKetQua"],                   
            //                     );
            //             }
            //         }
            //     }else{
            //             console.log("ko co du lieu  CHC_GetKetQua lỗi: "+ err);
            //         }
            //     });

                

//                 /**END CHC_GetKetQua */




                
//             /*[CHC_GetKetQuaXN]*/
//             var mang5='';
//             request.input('HopDong_Id', sql.Int,1930);
//             request.execute('[CHC_GetKetQuaXN]', function(err, recordsets, returnValue) {
//                 if(err === undefined){//ko lỗi
//                     mang5 = recordsets[0];// có dữ liệu
//                     if(mang5.length>0){
//                         for(var i=0;i<mang5.length;i++){
//                             mangtam=mang5[i];
//                             PushToMySQL_KetQuaXN(
//                                 mangtam ["STT"],
//                                 mangtam["NhomDichVu_Id"],
//                                 mangtam["MaDichVu"],
//                                 mangtam["KetQua"],
//                                 mangtam["DonViTinh"],
//                                 mangtam["BatThuong"],
//                                 mangtam["BSKetLuan"],
//                                 mangtam["TenGroupCap2"],
//                                 mangtam["TenGroup"],
//                                 mangtam["NoiDung"],
//                                 mangtam["NhomNoiDung"],
//                                 mangtam["CSBT"],
//                                 mangtam["CLSYeuCau_Id"],
//                                 mangtam["TenBenhNhan"],
//                                 mangtam["SoVaoVien"],
//                                 mangtam["BenhNhan_Id"],
//                                 mangtam["HopDong_Id"],
//                                 mangtam["NgayGioThucHien"],
//                                 mangtam["SoPhieu"],
//                                 mangtam["TenDichVu"],
//                                 mangtam["DichVu_Id"],
//                                 );
//                         }
//                     }
//                 }else{
//                         console.log("ko co du lieu  CHC_GetKetQuaXN");
//                     }
//             });

//             /*end [CHC_GetKetQuaXN]*/

              var mang6='';
            request.input('HopDong_Id', sql.Int,1930);
            request.execute('[CHC_GetKetQua_KhamBenh]', function(err, recordsets, returnValue) {
                if(err === undefined){//ko lỗi
                    mang6 = recordsets[0];// có dữ liệu
                    if(mang6.length>0){
                  
                        for(var i=0;i<mang6.length;i++){
                            mangtam=mang6[i];
                            PushToMySQL_KetQua(
                                mangtam ["BenhNhan_Id"],
                                mangtam["HopDong_Id"],
                                mangtam["YeuCauChiTiet_Id"],
                                mangtam["DichVu_Id"],
                                mangtam["NgayTaoHis"],
                                mangtam["NhomDichVu_ID"],
                                mangtam["TenDichVu"],
                                mangtam["JsonKetQua"], 
                                mangtam["TenNhomDichVu"], 
                                mangtam["MaNhomDichVu"],
                                mangtam["PhanLoai"],       
                                mangtam["TieuDe"], 
                                mangtam["NgayKetQua"],                   
                                );
                        }
                    }
                }else{
                        console.log("ko co du lieu  CHC_GetKetQua_KhamBenh lỗi: "+ err);
                    }
                });



            
//             var mang7='';
//             request.input('HopDong_Id', sql.Int,1930);
//             request.execute('[CHC_GetMauTuVan]', function(err, recordsets, returnValue) {
//                 if(err === undefined){//ko lỗi
//                     mang7 = recordsets[0];// có dữ liệu
//                     if(mang7.length>0){
                  
//                         for(var i=0;i<mang7.length;i++){
//                             mangtam=mang7[i];
//                             PushToMySQL_KetQua_TuVan(
//                                 mangtam["KetLuan"],
//                                 mangtam["TenDichVu"],
//                                 mangtam["MaNhomDichVu"],
//                                 mangtam["BenhNhan_Id"],
//                                 mangtam["TenNhomDichVu" ],
//                                 mangtam["NhomDichVu_Id"],
//                                 mangtam["KetLuan_Text"],
//                                 mangtam["NhanXet_Text"],
//                                 mangtam["XepLoai"],
//                                 mangtam["MaYte" ],
//                                 mangtam["TenBenhNhan"],
//                                 mangtam["PhanLoaiSucKhoe"],
//                                 mangtam["HopDong_Id" ],
//                                 mangtam["STT"],
//                                 mangtam["LoaiDichVu_Id"],   
//                                 mangtam["CanNang"] ,      
//                                 mangtam["ChieuCao"] ,      
//                                 mangtam["BMI"],       
//                                 mangtam["Mach"] ,      
//                                 mangtam["HuyetAp"]              
//                                 );
//                         }
//                     }
//                 }else{
//                         console.log("ko co du lieu  CHC_GetMauTuVan lỗi: "+ err);
//                     }
//                 });



                var mang8='';
                request.input('HopDong_Id', sql.Int,1930);
                request.execute('[CHC_GetToaThuoc]', function(err, recordsets, returnValue) {
                    if(err === undefined){//ko lỗi
                        mang8 = recordsets[0];// có dữ liệu
                        if(mang8.length>0){
                            for(var i=0;i<mang8.length;i++){
                                mangtam=mang8[i];
                                PushToMySQL_Thuoc(
                                    mangtam["BenhNhan_Id"],
                                    mangtam["NgayKham"],
                                    mangtam["TenDichVu"],
                                    mangtam["HopDong_Id"],
                                    mangtam["ChanDoan"],
                                    mangtam["LoiDan"],
                                    mangtam["Duoc_Id"], 
                                    mangtam["TenDuocDayDu"],
                                    mangtam["Sang"],
                                    mangtam["Trua"],
                                    mangtam["Chieu"], 
                                    mangtam["Toi"],
                                    mangtam["DuongDung"],
                                    mangtam["SoToa"],
                                    mangtam["TenBacSiKham"],
                                    mangtam["SoNgay"]
                                    );
                                  
                              
                            }
                        }
                    }else{
                            console.log("ko co du lieu  CHC_GetToaThuoc lỗi: "+ err);
                        }
                    });


    /** lôix finish MSSQL*/
    }else{
        console.log("lỗi MS SQL");
        connection.close();
    }
    });
      /** finish MSSQL*/
}
