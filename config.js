var config = {
  "db": "localhost/oauth-example-test",
  "rootURL": "http://localhost:3001"
};
var mongoose = require('mongoose');

mongoose.connect(config.db, {});