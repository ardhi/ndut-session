// Based on https://github.com/fastify/fastify-flash/blob/master/src/flash.ts
const format = require('util')

module.exports = {
  flash: function (type, ...message) {
    const { _ } = this.server.ndut.helper
    let sess = this.session.flash
    if (!sess) {
      sess = {}
      this.session.flash = sess
    }
    if (message.length === 0) throw new Error('Flash message is required')
    if (_.isArray(message[0])) {
      for (let i = 0; i < message[0].length; i++) {
        sess = {
          ...sess,
          [type]: (sess[type] || []).concat(message[0][i])
        }
      }
    } else {
      sess = {
        ...sess,
        [type]: (sess[type] || []).concat(message.length > 1 ? format.apply(undefined, message) : message[0])
      }
    }
    this.session.flash = sess
    return this.session.flash[type].length
  }
}