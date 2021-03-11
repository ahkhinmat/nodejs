
var cfsql = require('./configSql2');
/* Cấu hình mysql*/
var mysql = require('mysql');
var configMysql=cfsql.kbyte;
var connection_mysql = mysql.createConnection(configMysql);
connection_mysql.connect(function(err) {
    if (err) throw err;
    console.log("Mysql Connected!!!")
  });
  /**
   * connect api get token
   */
  var access_token='';
var axios = require('axios');
var qs = require('qs');
var data = qs.stringify({
 'client_id': '6aSoqSHvNPFhTOb_gl8b0nSl1iAa',
'client_secret': 'TlJ7bVslKKIEX8G0yGP42kfgLDca',
'grant_type': 'client_credentials' 
});
var config = {
  method: 'post',
  url: 'https://lgsp.danang.gov.vn/token',
  headers: { 
    'Content-Type': 'application/x-www-form-urlencoded'
  },
  data : data
};

axios(config)
.then(function (response) {
    try {
      console.log(JSON.stringify(response.data.access_token));
      access_token=response.data.access_token;
      var request = require('request');
      var options = {
        'method': 'GET',
        'url': 'https://lgsp.danang.gov.vn/dldc/1.0.0/quocgia',
        'headers': {
          'Authorization': 'Bearer '+response.data.access_token
        }
      };
      request(options, function (error, response) {
        if (error) throw new Error(error);
            const xml2js = require('xml2js');
            const parser = new xml2js.Parser({ attrkey: "object" });
            parser.parseString(response.body, function(error, result) {
              if(error === null) {
                connection_mysql.query('DELETE FROM dm_quocgia', function (error, results, fields) {
                  if (error) throw error;
                  else console.log('deleted  on dm_quocgia');
                });
                  result. objects.object.forEach(function(item){
                            //console.log('ma '+item. ma + ' id '+item. id+ ' ten '+item. ten);
                            var post  = {
                              ma:item.ma,
                              id:item. id,
                              ten:item.ten,
                            };
                            if(item.ten){
                                    var query = connection_mysql.query('INSERT INTO dm_quocgia SET ?', post, function (error, results, fields) {
                                    if (error) {
                                        console.log('lỗi insert mysql'+ error); 
                                    }
                                    else{
                                        console.log(query.sql); 
                                    }
                                });   
                            }   
                  });
              }
              else {
                  console.log(error);
              }
          });
      });
      
        var options2 = {
          'method': 'GET',
          'url': 'https://lgsp.danang.gov.vn/dldc/1.0.0/donvihanhchinh',
          'headers': {
            'Authorization': 'Bearer '+response.data.access_token
          }
        };
        request(options2, function (error, response) {
          if (error) throw new Error(error);
              const xml2js = require('xml2js');
              const parser = new xml2js.Parser({ attrkey: "object" });
              parser.parseString(response.body, function(error, result) {
                if(error === null) {
                  connection_mysql.query('DELETE FROM dm_donvihanhchinh', function (error, results, fields) {
                    if (error) throw error;
                    else console.log('deleted  on dm_donvihanhchinh');
                  });
                    result. objects.object.forEach(function(item){
                              var post  = {
                                ma:item.ma,
                                chaId:item.chaId,
                                ten:item.ten,
                                id:item. id,
                                capId:item.capId
                              };
                              if(item.ten){
                                      var query = connection_mysql.query('INSERT INTO dm_donvihanhchinh SET ?', post, function (error, results, fields) {
                                      if (error) {
                                          console.log('lỗi insert mysql'+ error); 
                                      }
                                      else{
                                          console.log(query.sql); 
                                      }
                                  });   
                              }   
                    });
                }
                else {
                    console.log(error);
                }
            });
        });
   
    } catch (error) {
      access_token=null;
      console.log('ko lấy được token danh mục donvihanhchinh'+error)
    }
})
.catch(function (error) {
  console.log(error);
});
/**
 * GetDanhMucQuocGia
 */




