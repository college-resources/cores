const passport = require('passport')

const keycloakStrategy = require('./keycloakStrategy')
const passwordStrategy = require('./passwordStrategy')

passport.use('keycloak', keycloakStrategy)
passport.use('password', passwordStrategy)

passport.serializeUser((user, done) => done(null, user))
passport.deserializeUser((user, done) => done(null, user))

module.exports = [passport.initialize(), passport.session()]
