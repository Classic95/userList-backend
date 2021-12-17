const Users = require("../models/Users");
const {status} = require("../constants/constants");


const getUserProfile = async (req, res) => {
  try {
    const user = await Users.find({})
    return res.status(status.SUCCESS3).send(utility.successRes('Success', user))
  } catch (error) {
    return res.status(status.ERROR).send(utility.errorRes('Something went wrong'))
  }
}

module.exports = {
  getUserProfile
}
