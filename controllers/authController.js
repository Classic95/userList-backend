const { status } = require("../constants/constants");
const Users = require("../models/Users");
const utility = require("../helpers/utility");

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    let userModel = await Users.findOne({
      email, password
    });
    console.log('userModel', userModel)
    
    if (userModel) {
      const token = await utility.generateToken({ email, password })
      return res.status(status.SUCCESS).send(utility.successRes('Success', { token: token }));
    }
    console.log('userModel', userModel)

    return res.status(status.ERROR).send(utility.errorRes('Login Failed'))
  } catch (error) {
    console.log('error', error)
    return res.status(status.ERROR).send(utility.errorRes('Login Failed'))
  }
};

module.exports = {
  login,
};
