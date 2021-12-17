const { status } = require("../constants/constants");
const Users = require("../models/Users");
const utility = require("../helpers/utility");

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    let userModel = await Users.findOne({
      email, password, admin: true
    });
    if (userModel) {
      return res.status(status.SUCCESS).send(utility.successRes('Success', userModel));
    }
    return res.status(status.ERROR).send(utility.errorRes('Login Failed'))
  } catch (error) {
    return res.status(status.ERROR).send(utility.errorRes('Login Failed'))
  }
};

module.exports = {
  login,
};
