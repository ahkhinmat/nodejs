var axios = require('axios');
var data = JSON.stringify({"RQST":{"name":"send_sms_list","REQID":"1","LABELID":"141088","CONTRACTTYPEID":"1",
"CONTRACTID":"13023","TEMPLATEID":"685234",
"PARAMS":[{"NUM":"1","CONTENT":"chuc may man va manh khoe nhe node"}],
"encoding":"8","SCHEDULETIME":"",
"MOBILELIST":"84905294022",
"ISTELCOSUB":"0","AGENTID":"121","APIUSER":"bvhoanmydn","APIPASS":"bvhoanmy@999","USERNAME":"DN_CS"}});

var config = {
  method: 'post',
  url: 'http://113.185.0.35:8888/smsmarketing/api',
  headers: { 
    'Content-Type': 'application/json', 
    'charset': 'UTF-8', 
    'Cookie': 'JSESSIONID=6211C2B96B1A4CE7A18E7D2B2E679CA9'
  },
  data : data
};

axios(config)
.then(function (response) {
  console.log(JSON.stringify(response.data));
})
.catch(function (error) {
  console.log(error);
});
