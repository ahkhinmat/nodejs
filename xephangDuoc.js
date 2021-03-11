var sql = require('mssql');
const format = require("node.date-time");
var cf = require('./config');
var config = cf.config;
var mang='';
var thoigianReload=5000;
var chuoitrave = '';
var chuoi1 = '';
var count = 0;
var id_send=0;
var loai='';
var count_queryDatabase=0;
var count_queryNode=0;
loadDS ();

function loadDS () {	
	var connection = new sql.Connection(config, function(err) {
		if (err === null) {				
			var request = new sql.Request(connection);
			request.input('ngaytiepnhan', sql.VarChar(10),'20180412');
			request.input('PhanLoai', sql.Int,6);//1 là nhóm dươc	
			  request.execute('[HIS_DSBenhNhan_Pro_Cache]', function(err, recordsets, returnValue) {
				if(err === undefined){
					mang = recordsets[0];
					count_queryNode++;	

					connection.close();
					setTimeout(function() {
						loadDS();
					}, thoigianReload);
				}else{
					connection.close();
					loadDS();
				}
			});
		}else{
			connection.close();
			loadDS();
		}
	});	
}

module.exports.loadDanhSach = function(data) {

	
	count_queryDatabase++;// client lấy
	console.log('count_queryDB_Duoc:'+count_queryDatabase+' on '+new Date().format("y-M-d H:m:SS") );

	data_return = '';
	if (mang.length == 0) {
		data_return = '||';		
	} else {


		var dsFull = [];
		var dsIsCheckin = [];
			
		var n1 = 0;
		var n2 = 0;
		console.log('duoc 4800 rows:'+mang.length+' on '+new Date());


		//console.log('dsSinhHieu-rows : '+mang.length);
			
			if(mang.length>0){
				if(data.optionView=='0'){//lấy full
					//console.log("nhanh 0: phongban_id : "+data.idphong+" ipclient "+data.ipclient+"  view:"+ data.optionView);
					for(var i=0;i<mang.length;i++){							
						mangtam=mang[i];	
						if(data.idphong==mangtam["PhongBan_Id"]){				
							dsFull[n1] = {
								id:mangtam["AutoIDCheckin"],
								AutoIDCheckin: mangtam["AutoIDCheckin"],
								TenBenhNhan: mangtam["TenBenhNhan"],
								NamSinh: mangtam["NamSinh"],
								MaYTe: mangtam["SoVaoVien"],
								TenPhongBan: mangtam["TenPhongBan"],
								TrangThai: mangtam["TrangThai"],
								TrangThaiChecKingStr: mangtam["TrangThaiChecKingStr"],
								CheckInLuc: mangtam["CheckInLucB"],
								Goi: n1,
								BatDau: n1,
								ThuTienThuoc:  n1,	
								Xong: n1,
								GoiNho:  mangtam["GoiNho"],
								GoiValue:  mangtam["Goi"],
								BatDauValue:  mangtam["BatDau"],
								XongValue:  mangtam["Xong"],
								LastGoiNho:  mangtam["LastGoiNho"],
								CoGhiChu:  mangtam["CoGhiChu"],	
								TrangThaiKhamBenh:  mangtam["TrangThaiKhamBenh"],	
								ThuTienThuocValue:  mangtam["ThuTienThuoc"],
								CountKQXN: mangtam["CountKQXN"],
								SoLuongHISXN: mangtam["SoLuongHISXN"],
								SoLuongDuyet: mangtam["SoLuongDuyet"],
								CountKQ: mangtam["CountKQ"],
								CountKQtotal: mangtam["CountKQtotal"],
								CountAll: mangtam["CountAll"],
								OrderCol: mangtam["OrderCol"],
								CoKqXnLuc: mangtam["CoKqXnLuc"],
								Id_NghiepVu: mangtam["Id_NghiepVu"],
								LyDoUuTien:mangtam["LyDoUuTien"],
								IpEndLast:mangtam["IpEndLast"],
								PhongGoiDauTien:mangtam["PhongGoiDauTien"],
								GhiChu:mangtam["GhiChu"],
					
							};
							n1++;							
						}						
					}	

				}else {
					console.log("nhanh 1: phongban_id : "+data.idphong+" ipclient "+data.ipclient+"  view:"+ data.optionView);
					for(var i=0;i<mang.length;i++){							
						mangtam=mang[i];	
						//console.log('row '+i);
						if(data.idphong==mangtam["PhongBan_Id"] && (mangtam["TrangThai"])==1&& (mangtam["Xong"])==0 ){
						//typeof query !== 'undefined' && query	
						console.log(" IPVIEW_KB_5000 "+ipView+ mangtam["PhongBan_Id"] +' CheckInLuc '+ mangtam["TrangThai"]);			
							dsFull[n1] = {
								id:mangtam["AutoIDCheckin"],
								AutoIDCheckin: mangtam["AutoIDCheckin"],
								TenBenhNhan: mangtam["TenBenhNhan"],
								NamSinh: mangtam["NamSinh"],
								MaYTe: mangtam["SoVaoVien"],
								TenPhongBan: mangtam["TenPhongBan"],
								TrangThai: mangtam["TrangThai"],
								TrangThaiChecKingStr: mangtam["TrangThaiChecKingStr"],
								CheckInLuc: mangtam["CheckInLucB"],
								Goi: n1,
								BatDau: n1,
								ThuTienThuoc:  n1,	
								Xong: n1,
								GoiNho:  mangtam["GoiNho"],
								GoiValue:  mangtam["Goi"],
								BatDauValue:  mangtam["BatDau"],
								XongValue:  mangtam["Xong"],
								LastGoiNho:  mangtam["LastGoiNho"],
								CoGhiChu:  mangtam["CoGhiChu"],	
								TrangThaiKhamBenh:  mangtam["TrangThaiKhamBenh"],
								ThuTienThuocValue:  mangtam["ThuTienThuoc"],	
								CountKQXN: mangtam["CountKQXN"],
								SoLuongHISXN: mangtam["SoLuongHISXN"],
								SoLuongDuyet: mangtam["SoLuongDuyet"],	
								CountKQ: mangtam["CountKQ"],
								CountKQtotal: mangtam["CountKQtotal"],
								CountAll: mangtam["CountAll"],
								OrderCol: mangtam["OrderCol"],
								CoKqXnLuc: mangtam["CoKqXnLuc"],
								Id_NghiepVu: mangtam["Id_NghiepVu"],
								LyDoUuTien:mangtam["LyDoUuTien"],
								IpEndLast:mangtam["IpEndLast"],
								PhongGoiDauTien:mangtam["PhongGoiDauTien"],
								GhiChu:mangtam["GhiChu"],
										
							};
							n1++;							
						}						
					}	
					
				}		
				
				
				
			}
				
		data_return = JSON.stringify(dsFull) ;
		
	}

	return data_return;
}

