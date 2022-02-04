// based on: https://github.com/fastify/session/blob/master/lib/store.js

class Store {
  constructor (options = {}) {
    this.scope = options.scope
    this.model = this.scope.ndutDb.model.SessionStore
  }

  set (sessionId, session, callback) {
    this.model.replaceOrCreate({
      id: sessionId,
      session
    })
      .then(resp => {
        callback()
      })
      .catch(err => {
        this.scope.log.error(`[Session] ${err.message}`)
        callback(null, null)
      })
  }

  get (sessionId, callback) {
    this.model.findOne({ where: { id: sessionId } })
      .then(resp => {
        let result
        if (resp) result = resp.session
        callback(null, result)
      })
      .catch(err => {
        this.scope.log.error(`[Session] ${err.message}`)
        callback(null, null)
      })
  }

  destroy (sessionId, callback) {
    this.model.remove({ id: sessionId })
      .then(resp => {
        callback()
      })
      .catch(err => {
        this.scope.log.error(`[Session] ${err.message}`)
        callback(null, null)
      })
  }
}

module.exports = Store
