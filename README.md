node-oauth2-server
==================

OAuth 2.0 server supports password and refresh_token flows.
In order to run the server:

1. Install and run mongodb
2. Run `node seed.js` to set up database with one user and one client
3. Start server with `node app.js`
4. To get access token & refresh token, run 
`curl localhost:3000/oauth/token -u d-app-251087:123 -X POST -v -d grant_type=password -d username=abc@abc.com -d password=test`
5. To refresh token with refresh_token: run `curl localhost:3000/oauth/token -u d-app-251087:123 -X POST -d grant_type=refresh_token -d username=abc@abc.com -d password=test -d refresh_token={{refresh_token}}`



