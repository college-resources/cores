const session = require('express-session')
const redis = require('redis')

let RedisStore = require('connect-redis')(session)

const { redis: redisGlobals } = require('../../common/globals.json')

let redisClient = redis.createClient({ url: redisGlobals.HOST })

const sess = {
  store: new RedisStore({ client: redisClient }),
  cookie: {},
  resave: false,
  saveUninitialized: true,
  secret: process.env.SESSION_SECRET || 'local-sessions'
}

module.exports = session(sess)
