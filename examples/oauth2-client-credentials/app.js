var request = require('request');

/*
 Example of the client credentials grant type

 This grant type flow occurs strictly between a client app and the authorization server.
 An end user does not participate in this grant type flow.
*/

var API_BASE_URL = 'https://api.fleetlog.com.au';
var CLIENT_ID = process.env.FLEETLOG_CLIENT_ID || 'test';
var CLIENT_SECRET = process.env.FLEETLOG_CLIENT_SECRET || 'clientsecret';

var auth_string = new Buffer(CLIENT_ID + ':' + CLIENT_SECRET).toString('base64');

var payload = {};
payload.grant_type = 'client_credentials';


request({
  method: 'POST',
  url: API_BASE_URL + '/v2/token',
  headers: {
    'Authorization': 'Basic ' + auth_string,
    'Content-Type': 'application/x-www-form-urlencoded'
  },
  form: payload
}, function(error, response, body) {
  var bodyObj, e;

  if (!error && response.statusCode == 200) {
    try {
      bodyObj = JSON.parse(body);
    } catch (_error) {
      console.log(_error);
      return;
    }
    console.log(bodyObj)

  } else {
    // show error
    return console.log('Status code: ' + response.statusCode + ' Error:' + error);
  }
});
