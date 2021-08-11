const { default: KcAdminClient } = require('keycloak-admin')
const { Issuer } = require('openid-client')

const { handleError } = require('../lib/error')

const client = (async () => {
  // TODO HARDCODED BS
  const keycloakIssuer = await Issuer.discover('http://172.18.0.3:8080/auth/realms/cores')

  // TODO HARDCODED BS
  return new keycloakIssuer.Client({
    client_id: 'web-local',
    client_secret: '7df5fa09-5388-4833-a9fd-05485e7cd926',
    token_endpoint_auth_method: 'client_secret_post'
  })
})()

// TODO HARDCODED BS
const kcAdminClient = new KcAdminClient({
  baseUrl: 'http://172.18.0.3:8080/auth',
  realmName: 'cores'
})

// TODO HARDCODED BS
const credentials = {
  grantType: 'client_credentials',
  clientId: 'realm-management',
  clientSecret: 'd98ba078-0f68-4888-ab67-452efcafec98'
}

kcAdminClient.auth(credentials)
setInterval(() => kcAdminClient.auth(credentials).catch(handleError), 58 * 1000)

module.exports.grant = async (username, password) => (await client).grant({
  grant_type: 'password',
  username,
  password
})

module.exports.userInfo = async (token) => (await client).userinfo(token)

module.exports.createUser = async (
  { email, firstName, lastName }
) => (await kcAdminClient).users.create({
  username: email, email, firstName, lastName,enabled: true
})

module.exports.resetPassword = async (userId, password) => (await kcAdminClient).users.resetPassword({
  id: userId,
  credential: {
    temporary: false,
    type: 'password',
    value: password
  }
})
