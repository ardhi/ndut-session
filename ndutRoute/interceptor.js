const fastifySession = require('@fastify/session')
const fastifyCookie = require('fastify-cookie')

module.exports = async function (options) {
  const { _, defNdutKeys } = this.ndut.helper
  await this.register(fastifyCookie)
  await this.register(fastifySession, _.omit(options, defNdutKeys))
}
