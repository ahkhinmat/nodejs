

var sql = require('mssql');
var cf = require('./config');
var config = cf.config;
var mang='';
var thoigianReload=5000;
var count_queryNode=0;
loadDS ();

function loadDS () {	
	var connection = new sql.Connection(config, function(err) {
		if (err === null) {				
			var request = new sql.Request(connection);
			request.input('ngaytiepnhan', sql.VarChar(10),'20180413');
			  request.execute('[HIS_DSDichVuFromHisPro_KB_View_Pro_Cache]', function(err, recordsets, returnValue) {
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
	data_return = '';
	if (mang.length == 0) {
		data_return = '||';		
	} else {
		var dsFull = [];
			
		var n1 = 0;
		var PhongBan_ID_Str_Arr=(data.PhongBan_ID_Str).split(";");
		var ipView=data.IPView;
		//console.log('KB5000 '+ipView+'-'+ data.ipclient +' on '+new Date());

		
			if(mang.length>0){
				if(data.optionView=='0'){//lấy full
			
					for(var i=0;i<mang.length;i++){							
						mangtam=mang[i];
						var tam_idPohongban=String(mangtam["PhongBan_Id"]);	
						var a = PhongBan_ID_Str_Arr.indexOf(tam_idPohongban);
		
							if(a>=0 && ipView==(mangtam["IP"]))	{
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
								Xong: n1,
								GoiNho:  mangtam["GoiNho"],
								GoiValue:  mangtam["Goi"],
								BatDauValue:  mangtam["BatDau"],
								XongValue:  mangtam["Xong"],
								LastGoiNho:  mangtam["LastGoiNho"],
								CoGhiChu:  mangtam["CoGhiChu"],	
								TrangThaiKhamBenh:  mangtam["TrangThaiKhamBenh"],	
								TenDichVu:  mangtam["TenDichVu"],
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
					//console.log('KBFull5000');
					for(var i=0;i<mang.length;i++){							
						mangtam=mang[i];
						var tam_idPohongban=String(mangtam["PhongBan_Id"]);	

						var a = PhongBan_ID_Str_Arr.indexOf(tam_idPohongban);
						if(a>=0 && (mangtam["TrangThai"])==1 && (mangtam["Xong"])==0 && (mangtam["IP"])==ipView ){	
									//console.log(" IPVIEW_KB_5000 "+ipView);
							dsFull[n1] = {
								id:mangtam["AutoIDCheckin"],
								AutoIDCheckin: mangtam["AutoIDCheckin"],
								TenBenhNhan: mangtam["TenBenhNhan"],
								NamSinh: mangtam["NamSinh"],
								MaYTe: mangtam["SoVaoVien"],
								TenPhongBan: mangtam["TenPhongBan"],
								TrangThai: mangtam["TrangThai"],
								TrangThaiChecKingStr: mangtam["TrangThaiChecKingStr"],
								CheckInLuc: mangtam["CheckInLuc"],
								Goi: n1,
								BatDau: n1,
								Xong: n1,
								GoiNho:  mangtam["GoiNho"],
								GoiValue:  mangtam["Goi"],
								BatDauValue:  mangtam["BatDau"],
								XongValue:  mangtam["Xong"],
								LastGoiNho:  mangtam["LastGoiNho"],
								CoGhiChu:  mangtam["CoGhiChu"],	
								TrangThaiKhamBenh:  mangtam["TrangThaiKhamBenh"],
								TenDichVu:  mangtam["TenDichVu"],
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


		//	console.log("dskhambenh: nhanh 1: phongban_id : "+data.idphong+" ipclient "+data.ipclient+"  view:"+ data.optionView+ ' rows '+n1);
				
		data_return = JSON.stringify(dsFull) ;
		
	}

	return data_return;
}

