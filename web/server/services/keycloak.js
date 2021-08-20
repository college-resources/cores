const { default: KcAdminClient } = require('keycloak-admin')
const { Issuer } = require('openid-client')

const { handleError } = require('../lib/error')

const { keycloak } = require('../../common/globals.json')

const client = (async () => {
  const issuerUrl = new URL(keycloak.HOST)
  issuerUrl.pathname = `/auth/realms/${keycloak.REALM}`
  const keycloakIssuer = await Issuer.discover(issuerUrl.href)

  return new keycloakIssuer.Client({
    client_id: keycloak.CLIENT_LOGIN,
    client_secret: keycloak.CLIENT_LOGIN_SECRET,
    token_endpoint_auth_method: 'client_secret_post'
  })
})()

const adminUrl = new URL(keycloak.HOST)
adminUrl.pathname = '/auth'
const kcAdminClient = new KcAdminClient({
  baseUrl: adminUrl.href,
  realmName: keycloak.REALM
})

const adminCredentials = {
  grantType: 'client_credentials',
  clientId: keycloak.CLIENT_MGMT,
  clientSecret: keycloak.CLIENT_MGMT_SECRET
}

kcAdminClient.auth(adminCredentials)
setInterval(() => kcAdminClient.auth(adminCredentials).catch(handleError), 58 * 1000)

module.exports.grant = async (username, password) => (await client).grant({
  grant_type: 'password',
  username,
  password
})

module.exports.userInfo = async (token) => (await client).userinfo(token)

module.exports.createUser = async (
  { email, firstName, lastName }
) => (await kcAdminClient).users.create({
  username: email, email, firstName, lastName, enabled: true
})

module.exports.resetPassword = async (userId, password) => (await kcAdminClient).users.resetPassword({
  id: userId,
  credential: {
    temporary: false,
    type: 'password',
    value: password
  }
})
