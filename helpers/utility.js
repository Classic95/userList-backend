const jwt = require('jsonwebtoken')

class Utility {
  static successRes(message = '', data) {
    return { status: 'success', message, data }
  }

  static errorRes(message, errorStatus = 'error') {
    return { status: errorStatus, message }
  }

  static generateToken(userData, token = false) {
    if (token) {
      return jwt.sign(userData, process.env.KEY, { expiresIn: '7d' })
    }
    return jwt.sign(userData, process.env.KEY, { expiresIn: '12h' })
  }

}

module.exports = Utility
