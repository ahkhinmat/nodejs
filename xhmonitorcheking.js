
//var util = require('util');

//console.log('first: '+util.inspect(process.memoryUsage()));

var sql = require('mssql');
const format = require("node.date-time");
var cf = require('./config');
var config = cf.config;
var mang='';
var thoigianReload=500;
var chuoitrave = '';
var chuoi1 = '';
var count = 0;
var id_send=0;
var loai='';
var count_queryDatabase=0;
//var count_queryNode=0;
loadDS ();
function loadDS () {	
	var connection = new sql.Connection(config, function(err) {
		if (err === null) {				
				var request = new sql.Request(connection);
			/*request.input('ngaytiepnhan', sql.VarChar(10),'20180413');*/
			  request.execute('[XH_monitor_checking]', function(err, recordsets, returnValue) {
				if(err === undefined){
					mang = recordsets[0];
					//count_queryNode++;
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

	data_return = '';
	if (mang.length == 0) {
		data_return = '||';		
	} else {

		var dsFull2 = [];
		var dsFull = [];
		var dsIsCheckin = [];
			
		var n1 = 0;
		var n2 = 0;
			
			if(mang.length>0){
					//console.log("nhanh 0: phongban_id : "+data.idphong+" ipclient "+data.ipclient+"  view:"+ data.optionView);
					for(var i=0;i<mang.length;i++){							
						mangtam=mang[i];	
							
							dsFull[n1] = {
								PhongBan_Id: mangtam["PhongBan_Id"],
								TenPhongBan: mangtam["TenPhongBan"],
								SoLuongDaCheking: mangtam["SoLuongDaCheking"],
								SLCanhBaoC1: mangtam["SLCanhBaoC1"],
								SLCanhBaoC2: mangtam["SLCanhBaoC2"],
								IsOverC1: mangtam["IsOverC1"],
								IsOverC2: mangtam["IsOverC2"],


							};
							n1++;							
												
					}	
				
			}
			//console.log("dskhambenh: nhanh 1: phongban_id : "+data.idphong+" ipclient "+data.ipclient+"  view:"+ data.optionView+ ' rows '+n1);
				
		data_return = JSON.stringify(dsFull) ;
		
	}




	return data_return;
}

