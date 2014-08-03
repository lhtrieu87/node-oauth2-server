var User = require('./user');
var AccessToken = require('./oauth_access_token');
var RefreshToken = require('./oauth_refresh_token');
var Client = require('./oauth_client');

module.exports.getUser = User.getUser;

module.exports.getAccessToken = AccessToken.getAccessToken;
module.exports.saveAccessToken = AccessToken.saveAccessToken;

module.exports.getRefreshToken = RefreshToken.getRefreshToken;
module.exports.saveRefreshToken = RefreshToken.saveRefreshToken;

module.exports.getClient = Client.getClient;
module.exports.grantTypeAllowed = Client.grantTypeAllowed;