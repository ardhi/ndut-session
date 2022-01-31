module.exports = {
  flash: function (type) {
    if (!type) {
      const allMessages = this.request.session.flash || {}
      this.request.session.flash = {}
      return allMessages
    }
    const { [type]: messages, ...flash } = this.request.session.flash || {}
    this.request.session.flash = flash
    return messages || []
  }
}