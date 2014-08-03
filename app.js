var express = require('express');
var config = require('./config');

var bodyParser = require('body-parser');
var oauthServer = require('node-oauth2-server');

var oauth = require('./oauth');

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

app.oauth = oauthServer({
  model: oauth,
  grants: ['password', 'refresh_token'],
  refreshTokenLifetime: null,
  debug: true
});

app.all('/oauth/token', app.oauth.grant());

app.get('/', app.oauth.authorise(), function (req, res) {
  res.send('Secret area!!!');
});

app.use(app.oauth.errorHandler());

app.listen(3000);

console.log('Server has been running at localhost:3000');
