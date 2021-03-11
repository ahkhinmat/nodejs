var fs = require('fs');
var util = require('util');
var log_file = fs.createWriteStream(__dirname + '/debug.log', {flags : 'w'});
var log_stdout = process.stdout;

console.log = function(d) { //
  log_file.write(util.format(d) + '\n');
  log_stdout.write(util.format(d) + '\n');
};
const format = require("node.date-time");
console.log(' on '+new Date().format("H:m:SS") );
var log_string=' on '+new Date().format("H:m:SS") +'\n';

const publicIp = require('public-ip');
var ip_public='';
(async () => {
    ip_public=await publicIp.v4();
	//console.log(ip_public);
   
})();


/*Cấu hình mssql*/
var mssql = require('mssql');
var cfsql = require('./configSql2');
var configMssql = cfsql.config2;

/*Hết  Cấu hình Mssql */

/* Cấu hình mysql*/
var mysql = require('mysql');
var configMysql;
if(ip_public=='113.160.226.66'){
    configMysql = cfsql.chc1;
   
}else{
    configMysql = cfsql.chc2;
}
console.log(' on '+new Date());
//console.log(configMysql);
var connection_mysql = mysql.createConnection(configMysql);

// connection_mysql.connect(function(err) {
//     if (err) throw err;
//     console.log("Mysql Connected!!!")
//   });
  //connection_mysql.end();
/**
 * hết cấu hình mysql
 */
 /**
  * start call function
  */ 

 try {
    let hopdong_id=2124;
//     getAllHopDong();
//     getBnByHopDongId(hopdong_id,'off');
//     getBnMapHDByHopDongId(hopdong_id,'off');
//    getKetQuaByHopDongId(hopdong_id,'off');
//    getXNByHopDongId(hopdong_id,'off');
    getTuVanByHopDongId(hopdong_id,'off');
   getToaThuocByHopDongId(hopdong_id,'off');

  }
  catch(error) {
    console.log(error)
  }

  finally {
      connection_mysql.end();
  }

  /**
  * end call function
  */

 function getAllHopDong(){
     console.log('on getAllHopDong function');
    let connection = new mssql.Connection(configMssql, function(err) {
        if(err === null) { 
            console.log('on connect');
            let request = new mssql.Request(connection);
            request.input('HopDong_Id', mssql.Int,1);
            request.execute('[CHC_GetHopDong]', function(err, recordsets, returnValue) {
            if(err === undefined){//ko lỗi
                mang = recordsets[0];// có dữ liệu
                if(mang.length>0){
                    for(var i=0;i<mang.length;i++){
                        mangtam=mang[i];
                         try {
                                   console.log( i+' -- '+  mangtam ["HopDong_ID"]+"   - -  "+mangtam["TenCongTy"]     );
       
                            } catch (error) {
                                console.log("lỗi CHC_GetHopDong "+error);
                            }
                    }
                    connection.close();
                }
            }
            else{
                    console.log("ko co du lieu CHC_GetBN");
                    connection.close();
            }
            });
        }else{
            console.log("ko co kết nối dc CSDL");
            connection.close();
        }
    });

 }
 function getBnByHopDongId(hopdong_id_p,option){
    console.log('on getBnByHopDongId function');
    let checkok=false;
    let lengrows=0;
    let countrow=0;
   let connection = new mssql.Connection(configMssql, function(err) {
       if(err === null) { 
           console.log('on connect');
           let request = new mssql.Request(connection);
           request.input('HopDong_Id', mssql.Int,hopdong_id_p);
           request.execute('[CHC_GetBN]', function(err, recordsets, returnValue) {
           if(err === undefined){//ko lỗi
               mang = recordsets[0];// có dữ liệu
                lengrows=mang.length;
               log_string=log_string+'table ksk_dm_benhnhan '+mang.length+' row'+'\n';
               if(mang.length>0){

                   for(var i=0;i<mang.length;i++){
                       mangtam=mang[i];
                      
                        try{
                            if(option=='on'){
                             PushToMySQL_DMBN(
                            mangtam ["BenhNhan_Id"],
                            mangtam["MaYte"],
                            mangtam["TenBenhNhan"],
                            mangtam["DiaChi"],
                            mangtam["GioiTinh"],
                            mangtam["NamSinh"],
                            mangtam["NgaySinh"]); 
                            }
                            log_string=log_string+' BenhNhan_Id '+mangtam ["BenhNhan_Id"]+'\n';
                            console.log(i+" on CHC_GetBN - table ksk_dm_benhnhan - BenhNhan_Id  " + mangtam ["BenhNhan_Id"]);
                        }
                        catch(err){
                            console.log("lỗi insert mysql CHC_GetBN " +err);
                        }
                        countrow++;
                    }
                    log_string=log_string+'ksk_dm_benhnhan has '+lengrows+ ' rows - '+' insserted  countrow'+(countrow)+' rows'+"\n";
                    if((countrow)==lengrows){
                        checkok=true;
                      
                    }
                    log_string=log_string+' ksk_dm_benhnhan success: '+checkok+"\n";
                    fs.appendFile('./log/log.txt', log_string, function (err) {
                        if (err) {
                            // append failed
                        } else {
                            // done
                        }
                      })
                    connection.close();
               }
            }else{
                   console.log("ko co du lieu CHC_GetBN");
                   connection.close();
               }
           });
       }else{
           console.log("ko co kết nối dc CSDL");
           connection.close();
       }
   });
  
}
function getBnMapHDByHopDongId(hopdong_id_p,option){
    console.log('on getBnMapHDByHopDongId function');
    let checkok=false;
    let lengrows=0;
    let countrow=0;
   let connection = new mssql.Connection(configMssql, function(err) {
       if(err === null) { 
           console.log('on connect');
           let request = new mssql.Request(connection);
           request.input('HopDong_Id', mssql.Int,hopdong_id_p);
           request.execute('[CHC_GetMapHD_BN]', function(err, recordsets, returnValue) {
           if(err === undefined){//ko lỗi
               mang = recordsets[0];// có dữ liệu
               lengrows=mang.length;
               log_string=log_string+'table ksk_hopdong_benhnhan '+mang.length+' row'+'\n';
               if(mang.length>0){
                   for(var i=0;i<mang.length;i++){
                       mangtam=mang[i];
                      
                        try{
                            if(option=='on'){
                              PushToMySQL_MapHD_BN(
                                mangtam ["Autoid_His"],
                                mangtam["HopDong_ID"],
                                mangtam["BenhNhan_ID"],
                                mangtam["STT"],
                                mangtam["NgayTao"],
                                );
                              }
                            console.log(i+" on ksk_hopdong_benhnhan CHC_GetMapHD_BN Autoid_His  " + mangtam ["Autoid_His"]);
                        }
                        catch(err){
                            console.log("lỗi insert mysql CHC_GetMapHD_BN " +err);
                        }
                        countrow++;
                        log_string=log_string+' Autoid_His '+mangtam ["Autoid_His"]+'\n';
                        
                    }
                 
                    if((countrow)==lengrows){
                        checkok=true;
                    }
                    log_string=log_string+'ksk_hopdong_benhnhan has '+lengrows+ ' rows - '+' insserted  countrow'+(countrow)+' rows'+"\n";
                    log_string=log_string+' ksk_hopdong_benhnhan success '+checkok+"\n";
                    fs.appendFile('./log/log.txt', log_string, function (err) {
                        if (err) {
                            // append failed
                        } else {
                            // done
                        }
                      })
                    connection.close();
               }
            }else{
                   console.log("ko co du lieu CHC_GetBN");
                   connection.close();
               }
           });
       }else{
           console.log("ko co kết nối dc CSDL");
           connection.close();
       }
   });
}
function getKetQuaByHopDongId(hopdong_id_p,option){
    console.log('on getKetQuaByHopDongId function');
   let connection = new mssql.Connection(configMssql, function(err) {
       if(err === null) { 
           console.log('on connect');
           let request = new mssql.Request(connection);
           request.input('HopDong_Id', mssql.Int,hopdong_id_p);
           request.execute('[CHC_GetKetQua]', function(err, recordsets, returnValue) {
           if(err === undefined){//ko lỗi
               mang = recordsets[0];// có dữ liệu
               if(mang.length>0){
                   for(var i=0;i<mang.length;i++){
                       mangtam=mang[i];
                        try{
                            if(option=='on'){
                                   // if(mangtam["JsonKetQua"]){
                            //     try {
                            //         const obj = JSON.parse(mangtam["JsonKetQua"]);
                            //             if(obj.Images){
                            //                 for (let index = 0; index < obj.Images.length; index++) {
                            //                     countImages++;
                            //                     console.log(obj.Images[index]["PathLink"]);
                            //                     fs.createReadStream(obj.Images[index]["PathLink"]).pipe(fs.createWriteStream('./hinh_cls/'+(obj.Images[index]["File_Name"])));
                            //                 }
                            //              }
                            //     } catch (error) {
                            //         console.log("not JSON"+error);
                            //     }
                            // }         
                            //console.log("countImages "+countImages);
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
                                    mangtam["NgayKetQua"]);
                              }
                            console.log(i+" on CHC_GetKetQua YeuCauChiTiet_Id  " + mangtam ["YeuCauChiTiet_Id"]);
                        }
                        catch(err){
                            console.log("lỗi insert mysql CHC_GetKetQua " +err);
                        }
                    }
                    connection.close();
               }
            }else{
                   console.log("ko co du lieu CHC_GetBN");
                   connection.close();
               }
           });
       }else{
           console.log("ko co kết nối dc CSDL");
           connection.close();
       }
   });
}
function getXNByHopDongId(hopdong_id_p,option){
    console.log('on getXNByHopDongId function');
   let connection = new mssql.Connection(configMssql, function(err) {
       if(err === null) { 
           console.log('on connect');
           let request = new mssql.Request(connection);
           request.input('HopDong_Id', mssql.Int,hopdong_id_p);
           request.execute('[CHC_GetKetQuaXN]', function(err, recordsets, returnValue) {
           if(err === undefined){//ko lỗi
               mang = recordsets[0];// có dữ liệu
               if(mang.length>0){
                   for(var i=0;i<mang.length;i++){
                       mangtam=mang[i];
                        try{
                            if(option=='on'){
                                PushToMySQL_KetQuaXN(
                                    mangtam ["STT"],
                                    mangtam["NhomDichVu_Id"],
                                    mangtam["MaDichVu"],
                                    mangtam["KetQua"],
                                    mangtam["DonViTinh"],
                                    mangtam["BatThuong"],
                                    mangtam["BSKetLuan"],
                                    mangtam["TenGroupCap2"],
                                    mangtam["TenGroup"],
                                    mangtam["NoiDung"],
                                    mangtam["NhomNoiDung"],
                                    mangtam["CSBT"],
                                    mangtam["CLSYeuCau_Id"],
                                    mangtam["TenBenhNhan"],
                                    mangtam["SoVaoVien"],
                                    mangtam["BenhNhan_Id"],
                                    mangtam["HopDong_Id"],
                                    mangtam["NgayGioThucHien"],
                                    mangtam["SoPhieu"],
                                    mangtam["TenDichVu"],
                                    mangtam["DichVu_Id"],
                                    mangtam["CLSKetQuaChiTiet_Id"],      
                                 ); 
                            }
                            console.log(i+" on CHC_GetKetQuaXN CLSKetQuaChiTiet_Id  " + mangtam ["CLSKetQuaChiTiet_Id"]);
                        }
                        catch(err){
                            console.log("lỗi insert mysql CHC_GetKetQuaXN " +err);
                        }
                    }
                    connection.close();
               }
            }else{
                   console.log("ko co du lieu CHC_GetBN");
                   connection.close();
               }
           });
       }else{
           console.log("ko co kết nối dc CSDL");
           connection.close();
       }
   });
}
function getTuVanByHopDongId(hopdong_id_p,option){
   console.log('on getTuVanByHopDongId function');
   let connection = new mssql.Connection(configMssql, function(err) {
       if(err === null) { 
           console.log('on connect');
           let request = new mssql.Request(connection);
           request.input('HopDong_Id', mssql.Int,hopdong_id_p);
           request.execute('[CHC_GetMauTuVan]', function(err, recordsets, returnValue) {
           if(err === undefined){//ko lỗi
               mang = recordsets[0];// có dữ liệu
               if(mang.length>0){
                   for(var i=0;i<mang.length;i++){
                       mangtam=mang[i];
                        try{
                            if(option=='on'){
                                PushToMySQL_KetQua_TuVan(
                                    mangtam["KetLuan"],
                                    mangtam["TenDichVu"],
                                    mangtam["MaNhomDichVu"],
                                    mangtam["BenhNhan_Id"],
                                    mangtam["TenNhomDichVu" ],
                                    mangtam["NhomDichVu_Id"],
                                    mangtam["KetLuan_Text"],
                                    mangtam["NhanXet_Text"],
                                    mangtam["XepLoai"],
                                    mangtam["MaYte" ],
                                    mangtam["TenBenhNhan"],
                                    mangtam["PhanLoaiSucKhoe"],
                                    mangtam["HopDong_Id" ],
                                    mangtam["STT"],
                                    mangtam["LoaiDichVu_Id"],   
                                    mangtam["CanNang"] ,      
                                    mangtam["ChieuCao"] ,      
                                    mangtam["BMI"],       
                                    mangtam["Mach"] ,      
                                    mangtam["HuyetAp"],
                                    mangtam["HopDong_BenhNhan_Id"],
                                                  
                                );
                            }
                            console.log(i+" on CHC_GetMauTuVan HopDong_BenhNhan_Id  " + mangtam ["HopDong_BenhNhan_Id"]);
                        }
                        catch(err){
                            console.log("lỗi insert mysql CHC_GetMauTuVan " +err);
                        }
                    }
                    connection.close();

               }
            }else{
                   console.log("ko co du lieu CHC_GetMauTuVan");
                   connection.close();
               }
           });
       }else{
           console.log("ko co kết nối dc CSDL");
           connection.close();
       }
   });
}
function getToaThuocByHopDongId(hopdong_id_p,option){
    console.log('on getToaThuocByHopDongId function');
   let connection = new mssql.Connection(configMssql, function(err) {
       if(err === null) { 
           let request = new mssql.Request(connection);
           request.input('HopDong_Id', mssql.Int,hopdong_id_p);
           request.execute('[CHC_GetToaThuoc]', function(err, recordsets, returnValue) {
           if(err === undefined){//ko lỗi
               mang = recordsets[0];// có dữ liệu
               if(mang.length>0){
                   for(var i=0;i<mang.length;i++){
                       mangtam=mang[i];
                        try{
                            if(option=='on'){
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
                                    mangtam["SoNgay"],
                                    mangtam["ToaThuoc_Id"]
                                );   
                            }
                            console.log(i+"on  CHC_GetToaThuoc ToaThuoc_Id  " + mangtam ["ToaThuoc_Id"]);
                        }
                        catch(err){
                            console.log("lỗi insert mysql CHC_GetToaThuoc " +err);
                        }
                    }
                    connection.close();
               }
            }else{
                   console.log("ko co du lieu CHC_GetMauTuVan");
                   connection.close();
               }
           });
       }else{
           console.log("ko co kết nối dc CSDL");
           connection.close();
       }
   });
}
/**Funtion to mysql host */
function PushToMySQL_DMBN(benhnhan_id,mayte,tenbenhnhan,diachi,gioitinh,namsinh,ngaysinh){

    connection_mysql.query('DELETE FROM ksk_dm_benhnhan WHERE BenhNhan_ID = '+benhnhan_id , function (error, results, fields) {
        if (error) throw error;
        console.log('deleted ksk_dm_benhnhan on BenhNhan_ID: '+benhnhan_id+ error);
      });
      let post  = {
                        BenhNhan_ID:benhnhan_id,
                         MaYte:mayte,
                         TenBenhNhan: tenbenhnhan,
                         DiaChi:diachi,
                         GioiTinh:gioitinh,
                         NamSinh:namsinh,
                         NgaySinh:ngaysinh
                      };
     let query = connection_mysql.query('INSERT INTO ksk_dm_benhnhan SET ?', post, function (error, results, fields) {
         if (error) {
             console.log('PushToMySQL_DMBN   lỗi insert vào table ksk_dm_benhnhan:'+error); 
         }
         else{
             console.log(query.sql); 
         }
     });
     connection_mysql.query('DELETE FROM ksk_users WHERE MaYte = '+mayte , function (error, results, fields) {
        if (error) throw error;
        console.log('deleted ksk_dm_benhnhan on mayte: '+mayte+ error);
      });
     let post2  = {
         MaYte:mayte,
         MatKhau:'123',
         DoiMatKhau:0
      };
      let query2 = connection_mysql.query('INSERT INTO ksk_users SET ?', post2, function (error, results, fields) {
         if (error) {
             console.log('PushToMySQL_DMBN  lỗi insert vào table ksk_users:'+error); 
         }
         else{
             console.log(query2.sql); 
         }
     });

     
}
function PushToMySQL_MapHD_BN(Autoid_His,HopDong_ID,BenhNhan_ID,STT,NgayTao){
    connection_mysql.query('DELETE FROM ksk_hopdong_benhnhan WHERE BenhNhan_ID = '+BenhNhan_ID+' and HopDong_ID=' +HopDong_ID, function (error, results, fields) {
        if (error) throw error;
        console.log(' deleted ksk_hopdong_benhnhan on BenhNhan_ID: '+BenhNhan_ID+ error);
      });
    var post  = {
                        Autoid_His:Autoid_His,
                        HopDong_ID: HopDong_ID,
                        BenhNhan_ID:BenhNhan_ID,
                        STT:STT,
                        NgayTao:NgayTao
                      };
     var query = connection_mysql.query('INSERT INTO ksk_hopdong_benhnhan SET ?', post, function (error, results, fields) {
         if (error) {
             console.log('lỗi insert mysql ksk_hopdong_benhnhan'+ error); 
         }
         else{
             console.log(query.sql); 
         }
     });     
}
function PushToMySQL_KetQua(BenhNhan_Id,HopDong_Id,	YeuCauChiTiet_Id,DichVu_Id,NgayTaoHis,NhomDichVu_ID,TenDichVu,JsonKetQua,TenNhomDichVu,MaNhomDichVu,PhanLoai,TieuDe,NgayKetQua){
        connection_mysql.query('DELETE FROM ksk_ketqua WHERE YeuCauChiTiet_Id = '+YeuCauChiTiet_Id+' and BenhNhan_Id=' +BenhNhan_Id, function (error, results, fields) {
            if (error) throw error;
            console.log('deleted ksk_ketqua on YeuCauChiTiet_Id: '+YeuCauChiTiet_Id+ error);
          });
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
    DichVu_Id,CLSKetQuaChiTiet_Id){
        connection_mysql.query('DELETE FROM ksk_ketqua_xetnghiem WHERE CLSKetQuaChiTiet_Id = '+CLSKetQuaChiTiet_Id+' and BenhNhan_Id=' +BenhNhan_Id, function (error, results, fields) {
            if (error) throw error;
            else console.log('deleted  on ksk_ketqua_xetnghiem: CLSKetQuaChiTiet_Id '+CLSKetQuaChiTiet_Id);
          });
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
                    CLSKetQuaChiTiet_Id:CLSKetQuaChiTiet_Id
                   
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
    LoaiDichVu_Id,CanNang,ChieuCao,BMI,Mach,HuyetAp,HopDong_BenhNhan_Id
){
    connection_mysql.query('DELETE FROM ksk_ketqua_tuvan WHERE HopDong_Id = '+HopDong_Id+' and BenhNhan_Id=' +BenhNhan_Id, function (error, results, fields) {
        if (error) throw error;
        console.log('deleted ksk_ketqua_tuvan on HopDong_Id: '+HopDong_Id);
      });
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
        HuyetAp:HuyetAp,
        HopDong_BenhNhan_Id:HopDong_BenhNhan_Id
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
    SoNgay,
    ToaThuoc_Id
){
    connection_mysql.query('DELETE FROM ksk_toathuoc WHERE ToaThuoc_Id = '+ToaThuoc_Id, function (error, results, fields) {
        if (error) throw error;
        console.log('deleted ksk_toathuoc on ToaThuoc_Id: '+ToaThuoc_Id);
      });
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
        SoNgay:SoNgay,
        ToaThuoc_Id:ToaThuoc_Id
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

