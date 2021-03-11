
var cfsql = require('./configSql2');
/* Cấu hình mysql*/
var mysql = require('mysql');
var configMysql=cfsql.kbyte;
// var connection_mysql = mysql.createConnection(configMysql);
// connection_mysql.connect(function(err) {
//     if (err) throw err;
//     console.log("Mysql Connected!!!")
//   });
  /**
   * connect api get token
   */
  var axios = require('axios');
  var qs = require('qs');
  var data = qs.stringify({
   'client_id': 'gT96lY2sJrOXbtB6tOHPAA1Wb5ka',
  'client_secret': 'M9UFifmV6RbUpMZDdd4RT34fUzwa',
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
    console.log(JSON.stringify(response.data.access_token));
    postdatatokhaiyte(response.data.access_token);
  })
  .catch(function (error) {
    console.log(error);
  });
  
  function postdatatokhaiyte(access_token){
    // var unirest = require('unirest');
    // var req = unirest('POST', 'https://lgsp.danang.gov.vn/dng/smartapp/1.0/quanlythongtin')
    //   .headers({
    //     'Authorization': 'Bearer '+access_token,
    //     'Content-Type': 'application/json'
    //   })
    //   .send(JSON.stringify({"hoVaTen":"Tạ Minh Kha","noiCuTruTinhId":7237,"noiCuTruHuyenId":7244,"noiCuTruXaId":7252,"noiDenTinhId1":"","noiDenHuyenId1":"","noiDenXaId1":"","noiDenTinhId2":"","noiDenHuyenId2":"","noiDenXaId2":"","noiDenTinhId3":"","noiDenHuyenId3":"","noiDenXaId3":"","noiDenGhiChu":"","coTrieuChungCovid":false,"diaChiNoiDen":"K52/09 Phan Thanh","soDienThoai":"0905294022","email":"","bienSoXe":"","trieuChungId":"","trieuChungKhac":"","benhManTinhId":"","benhManTinhKhac":"","soNgayLuuTru":0,"gioiTinhId":1,"quocTichId":1,"ngaySinh":"1992-10-02T00:00:00","soCMND":"201611241","noiOTinhId":7237,"noiOHuyenId":7244,"noiOXaId":7252,"laDenDaNang":false,"laKhaiHo":false,"noiCuTruChiTiet":"K52/09 Phan Thanh","soTheBHYT":"","tinhTrangTiepXucId":"","coThaiKy":false,"hinhAnh":"","maNoiCuTruTinh":"","maNoiCuTruHuyen":"","maNoiCuTruXa":"","maQuocTich":"","maNoiDenTinh1":"","maNoiDenHuyen1":"","maNoiDenXa1":"","maNoiDenTinh2":"","maNoiDenHuyen2":"","maNoiDenXa2":"","maNoiOTinh":"","maNoiOHuyen":"","maNoiOXa":""}))
    //   .end(function (res) { 
    //     if (res.error) throw new Error(res.error); 
    //     console.log('ticketNumber '+res.raw_body[1]);
    //   });
    var request = require('request');
    var options = {
      'method': 'POST',
      'url': 'https://lgsp.danang.gov.vn/dng/smartapp/1.0/quanlythongtin',
      'headers': {
        'Authorization': 'Bearer '+access_token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({"hoVaTen":"Tạ Minh Kha","noiCuTruTinhId":7237,"noiCuTruHuyenId":7244,"noiCuTruXaId":7252,"noiDenTinhId1":"","noiDenHuyenId1":"","noiDenXaId1":"","noiDenTinhId2":"","noiDenHuyenId2":"","noiDenXaId2":"","noiDenTinhId3":"","noiDenHuyenId3":"","noiDenXaId3":"","noiDenGhiChu":"","coTrieuChungCovid":false,"diaChiNoiDen":"K52/09 Phan Thanh","soDienThoai":"0905294022","email":"","bienSoXe":"","trieuChungId":"","trieuChungKhac":"","benhManTinhId":"","benhManTinhKhac":"","soNgayLuuTru":0,"gioiTinhId":1,"quocTichId":1,"ngaySinh":"1992-10-02T00:00:00","soCMND":"201611241","noiOTinhId":7237,"noiOHuyenId":7244,"noiOXaId":7252,"laDenDaNang":false,"laKhaiHo":false,"noiCuTruChiTiet":"K52/09 Phan Thanh","soTheBHYT":"","tinhTrangTiepXucId":"","coThaiKy":false,"hinhAnh":"","maNoiCuTruTinh":"","maNoiCuTruHuyen":"","maNoiCuTruXa":"","maQuocTich":"","maNoiDenTinh1":"","maNoiDenHuyen1":"","maNoiDenXa1":"","maNoiDenTinh2":"","maNoiDenHuyen2":"","maNoiDenXa2":"","maNoiOTinh":"","maNoiOHuyen":"","maNoiOXa":""})

    };
    request(options, function (error, response) {
      if (error) throw new Error(error);
      var object = JSON.parse(response.body);
      console.log('ticketNumber '+object['ticketNumber']);
});

    
  }
  



