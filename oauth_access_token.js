var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Relationship m-m between Users and Clients.
// Primary key comprises of clientId, userId and expires.
var OAuthAccessTokenSchema = new Schema({
  accessToken: {
    type: String,
    unique: true,
    required: true
  },
  clientId: {
    type: String,
    required: true
  },
  userId: {
    type: String,
    required: true
  },
  // Access tokens can be never expired.
  expires: Date
});

OAuthAccessTokenSchema.static('getAccessToken', function (bearerToken, callback) {
  OAuthAccessTokenModel.findOne({
    accessToken: bearerToken
  }, callback);
});

OAuthAccessTokenSchema.static('saveAccessToken', function (token, clientId, expires, userId, callback) {
  var fields = {
    clientId: clientId,
    userId: userId,
    expires: expires
  };

  OAuthAccessTokenModel.update({
    accessToken: token
  }, fields, {
    upsert: true
  }, function (err) {
    callback(err);
  });
});

var OAuthAccessTokenModel = mongoose.model('OAuthAccessToken', OAuthAccessTokenSchema);
module.exports = OAuthAccessTokenModel;
