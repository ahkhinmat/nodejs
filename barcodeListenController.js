var sql = require('mssql');
var cf = require('./config');
var config = cf.config;
var mang='';
var thoigianReload=1000;
var chuoitrave = '';
var chuoi1 = '';
var count = 0;
var id_send=0;
var loai='';
var ipCilent='';
var barcode='';
var data_return = '';



module.exports.loadDanhSach = function(data) {

	data=data.split("||");
	ipCilent=data[0];
	barcode=data[1];

	console.log('ipclient '+ ipCilent +" barcode "+barcode);


	var connection = new sql.Connection(config, function(err) {
		if (err === null) {				
			var request = new sql.Request(connection);

			request.input('MaYTe', sql.VarChar(9),barcode);	
			request.input('IpClient', sql.VarChar(15),ipCilent);
			
			request.execute('XH_GetInfoChecking', function(err, recordsets, returnValue) {
				if(err === undefined){
					mang = recordsets[0];	
				
					connection.close();


				}else{
					connection.close();
					
				}
			});
		}else{
			console.log(err);
			connection.close();
		

		}
	});	




	data_return='';

		var dangcho = [];
	
		var n1 = 0;
			
			
			if(mang.length>0){					
				for(var i=0;i<mang.length;i++){		

					mangtam=mang[i];		

						dangcho[n1] = {

							BenhNhan_Id: mangtam["BenhNhan_Id"],
							TenBenhNhan: mangtam["TenBenhNhan"],
							GioiTinh: mangtam["GioiTinh"],
							NamSinh: mangtam["NamSinh"],
							
				
						};
						n1++;	
				
					
				}// end for		
				
			}// end if(mang.length>0)
				//console.log(dangcho);
		//}
		data_return = JSON.stringify(dangcho) ;
		//console.log(data_return);
	
	//console.log(data_return);
	return data_return;
}


