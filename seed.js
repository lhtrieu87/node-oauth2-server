require('./config');

var User = require('./user');
var Client = require('./oauth_client');

User.create({
  email: 'abc@abc.com',
  hashedPassword: '$2a$10$aZB36UooZpL.fAgbQVN/j.pfZVVvkHxEnj7vfkVSqwBOBZbB/IAAK'
}, function () {
  console.log('An user was created!');
  Client.create({
    clientId: 'd-app-251087',
    clientSecret: '123'
  }, function () {
    console.log('A user & client were created!');
    process.exit();
  });
});