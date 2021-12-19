const jwt = require('jsonwebtoken')
const utility = require('../helpers/utility')
const { status } = require('../constants/constants')
const authController = require('../controllers/authController')

const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization
  return new Promise((response, reject) => {
    if (authHeader !== undefined) {
      const userToken = authHeader.split(' ')[1]
      // console.log('userToken---', userToken, typeof userToken, userToken != 'undefined')

      if (userToken !== 'undefined') {
        const user = jwt.verify(userToken, utility.KEY)
        // console.log('user---', user)
        if (!user) {
          return response(res.status(status.UNAUTHORIZED).send(utility.errorRes('Session expired')))
        }
        response(next());
      }
      // return response(res.status(status.UNAUTHORIZED).send(utility.errorRes('Session expired')))
    } else {
      console.log('jwt failed')
      return response(res.status(status.UNAUTHORIZED).send(utility.errorRes('Unauthorized Request')))
    }
  })
}

module.exports = {
  verifyToken,
}
