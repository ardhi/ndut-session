const Store = require('../lib/store')

module.exports = async function (options) {
  const store = new Store({ scope: this })
  options.store = store
}
