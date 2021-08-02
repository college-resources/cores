const LocalStrategy = require('passport-local')

const keycloak = require('../../services/keycloak')

module.exports = new LocalStrategy(
  {
    passReqToCallback: true,
    passwordField: 'password',
    usernameField: 'email'
  },
  async (req, username, password, done) => {
    try {
      const userData = await keycloak.grant(username, password)

      const accessToken = userData.access_token
      const refreshToken = userData.refresh_token
      let profile = await keycloak.userInfo(accessToken)

      if (profile && profile._json) {
        profile = profile._json
      }

      const info = {
        accessToken,
        profile,
        refreshToken
      }

      // TODO Sync profile ?

      done(null, info)
    } catch (err) {
      done(err)
    }
  }
)
