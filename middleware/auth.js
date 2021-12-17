const jwt = require('jsonwebtoken')
const utility = require('../helpers/utility')
const { status } = require('../constants/constants')
const authController = require('../controllers/authController')

const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization
  return new Promise((response, reject) => {
    if (authHeader !== undefined) {
      const userToken = authHeader.split(' ')[1]

      jwt.verify(userToken, utility.KEY, async (err, user) => {
        if (err || !user) {
          reject(res.status(status.UNAUTHORIZED).send(utility.errorRes('Session expired')))
        }

        response(next())
      })
    } else {
      console.log('jwt failed')
      reject(res.status(status.UNAUTHORIZED).send(utility.errorRes('Unauthorized Request')))
    }
  })
}

module.exports = {
  verifyToken,
}
