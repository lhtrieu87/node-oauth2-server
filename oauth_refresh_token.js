var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var OAuthRefreshTokenSchema = new Schema({
  refreshToken: {
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
  // Refresh token can be never expired.
  expires: Date
});

OAuthRefreshTokenSchema.static('saveRefreshToken', function (token, clientId, expires, userId, callback) {
  if(userId.id)
    userId = userId.id;

  var refreshToken = new OAuthRefreshTokenModel({
    refreshToken: token,
    clientId: clientId,
    userId: userId,
    expires: expires
  });

  refreshToken.save(callback);
});

OAuthRefreshTokenSchema.static('getRefreshToken', function (refreshToken, callback) {
  OAuthRefreshTokenModel.findOne({
    refreshToken: refreshToken
  }, function (err, token) {
    if(token)
      token.user = token.userId;

    callback(err, token);
  });
});

var OAuthRefreshTokenModel = mongoose.model('OAuthRefreshToken', OAuthRefreshTokenSchema);
module.exports = OAuthRefreshTokenModel;
