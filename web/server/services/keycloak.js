const { default: KcAdminClient } = require('keycloak-admin')
const { Issuer } = require('openid-client')

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

// kcAdminClient.auth({
//   grantType: 'password',
//   clientId: 'web-local',
//   clientSecret: '7df5fa09-5388-4833-a9fd-05485e7cd926',
//   username,
//   password
// })

module.exports.grant = async (username, password) => (await client).grant({
  grant_type: 'password',
  username,
  password
})

module.exports.userInfo = async (token) => (await client).userinfo(token)
