var bcrypt = require('bcrypt');
var crypto = require('crypto');
var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var OAuthUserSchema = new Schema({
  email: {
    type: String,
    unique: true,
    required: true
  },
  hashedPassword: {
    type: String,
    required: true
  },
  passwordResetToken: {
    type: String,
    unique: true
  },
  resetTokenExpires: Date,
  name: String
});

function hashPassword(password) {
  var salt = bcrypt.genSaltSync(10);
  return bcrypt.hashSync(password, salt);
}

OAuthUserSchema.static('register', function (fields, cb) {
  fields.hashedPassword = hashPassword(fields.password);
  delete fields.password;

  var user = new OAuthUserModel(fields);
  user.save(cb);
});

OAuthUserSchema.static('getUser', function (email, password, cb) {
  OAuthUserModel.authenticate(email, password, function (err, user) {
    if(err)
      return cb(err);
    return cb(null, user.email);
  });
});

OAuthUserSchema.static('authenticate', function (email, password, cb) {
  this.findOne({
    email: email
  }, function (err, user) {
    if(err)
      return cb(err);

    if(!user) {
      /******************************************
       * HANDLE USER NOT FOUND ERROR HERE!
       ******************************************/
      return;
    }

    if(!bcrypt.compareSync(password, user.hashedPassword)) {
      /******************************************
       * MISMATCHED PASSWORD!
       ******************************************/
      return;
    }

    return cb(null, user);
  });
});

var OAuthUserModel = mongoose.model('User', OAuthUserSchema);

module.exports = OAuthUserModel;
