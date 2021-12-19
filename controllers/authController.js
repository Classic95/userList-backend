const { status } = require("../constants/constants");
const Users = require("../models/Users");
const utility = require("../helpers/utility");

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    let userModel = await Users.findOne({
      email, password
    });

    if (!userModel) {
      return res.status(status.ERROR).send(utility.errorRes('Login Failed'))
    }

    const token = await utility.generateToken({ ...userModel })

    let update = await Users.updateOne({
      token, password
    }, {userId: userModel.userId});
    if (update) {
      return res.status(status.SUCCESS).send(utility.successRes('Success', { user: userModel, token: token }));
    }
    return res.status(status.ERROR).send(utility.errorRes('Login Failed'))
  } catch (error) {
    console.log('error', error)
    return res.status(status.ERROR).send(utility.errorRes('Login Failed'))
  }
};

module.exports = {
  login,
};
