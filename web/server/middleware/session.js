const session = require('express-session')
const {FirestoreStore} = require('@google-cloud/connect-firestore')
const {Firestore} = require('@google-cloud/firestore')

const sess = {
  cookie: {},
  resave: false,
  saveUninitialized: true,
  secret: process.env.SESSION_SECRET || 'local-sessions'
}

module.exports = session(sess)
