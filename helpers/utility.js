const jwt = require('jsonwebtoken')

class Utility {
  static KEY = "valuepitch";

  static successRes(message = '', data) {
    return { status: 'success', message, data }
  }

  static errorRes(message, errorStatus = 'error') {
    return { status: errorStatus, message }
  }

  static generateToken(data) {
    return jwt.sign(data, this.KEY, { expiresIn: '12h' })
  }

}

module.exports = Utility
