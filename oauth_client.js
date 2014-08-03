var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var authorizedClientIdsForPasswordFlow = ['d-app-251087'];

var OAuthClientSchema = new Schema({
  clientId: {
    type: String,
    unique: true,
    required: true
  },
  clientSecret: {
    type: String,
    unique: true,
    required: true
  }
});

OAuthClientSchema.static('getClient', function (clientId, clientSecret, callback) {
  var params = {
    clientId: clientId
  };

  if(clientSecret)
    params.clientSecret = clientSecret;

  OAuthClientModel.findOne(params, function (err, client) {
    callback(err, client);
  });
});

OAuthClientSchema.static('grantTypeAllowed', function (clientId, grantType, callback) {
  var hasError = false;

  // Password flow is only enabled for first class applications.
  if(grantType === 'password')
    return callback(hasError, authorizedClientIdsForPasswordFlow.indexOf(clientId) >= 0);

  if(grantType === 'refresh_token')
    return callback(hasError, true);

  // Only support password and refresh_token grant types.
  return callback(hasError, false);
});

var OAuthClientModel = mongoose.model('OauthClient', OAuthClientSchema);
module.exports = OAuthClientModel;
