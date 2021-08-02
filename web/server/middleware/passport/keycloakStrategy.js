const OAuth2Strategy = require('passport-oauth2')

// TODO HARDCODED BS
module.exports = new OAuth2Strategy(
  {
    authorizationURL: 'http://172.18.0.3:8080/auth/realms/cores/protocol/openid-connect/auth',
    tokenURL: 'http://172.18.0.3:8080/auth/realms/cores/protocol/openid-connect/token',
    clientID: 'web-local',
    clientSecret: '7df5fa09-5388-4833-a9fd-05485e7cd926',
    callbackURL: '/auth/callback/keycloak'
  },
  (accessToken, refreshToken, profile, done) => done(null, { accessToken, refreshToken, profile })
)
