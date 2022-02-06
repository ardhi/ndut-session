const fastifySession = require('@fastify/session')
const fastifyCookie = require('fastify-cookie')

module.exports = async function (name, notFoundMsg, options) {
  if (!['route', 'static'].includes(name)) return
  const { _, defNdutKeys, getNdutConfig } = this.ndut.helper
  const cfg = getNdutConfig('ndut-session')
  await this.register(fastifyCookie)
  await this.register(fastifySession, _.omit(cfg, defNdutKeys))
}
