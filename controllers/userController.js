const { status } = require("../constants/constants");
const Users = require("../models/Users");
const utility = require("../helpers/utility");

const getUserProfile = async (req, res) => {
  const { id } = req.params;
  let user = {};
  // let userModel = new Users(user);
  let userModel = await Users.findOne({
    _id: id,
  });
  return res
    .status(status.SUCCESS)
    .send(utility.successRes("Success", userModel));
};

const getUsersList = async (req, res) => {
  let userModel = await Users.find({ name: { $ne: 'Admin' } } );
  return res
    .status(status.SUCCESS)
    .send(utility.successRes("Success", userModel));
};

const addUsersList = async (req, res) => {
  try {
    const { name, email, dob, avatar, address, country } = req.body;
    let userModel = await Users.create({
      name,
      email,
      dob,
      avatar,
      address,
      country,
    });
    if (userModel) {
      return res
        .status(status.SUCCESS)
        .send(utility.successRes("Success", userModel));
    }
    return res.status(status.ERROR).send(utility.errorRes("ERROR"));
  } catch (error) {
    return res.status(status.ERROR).send(utility.errorRes("ERROR"));
  }
};

const updateUsersList = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, dob, avatar, address, country } = req.body;
    let userModel = await Users.updateOne(
      { _id: id },
      { name, email, dob, avatar, address, country }
    );
    if (userModel) {
      return res
        .status(status.SUCCESS)
        .send(utility.successRes("Success", userModel));
    }
    return res.status(status.ERROR).send(utility.errorRes("ERROR"));
  } catch (error) {
    return res.status(status.ERROR).send(utility.errorRes("ERROR"));
  }
};

module.exports = {
  getUserProfile,
  getUsersList,
  addUsersList,
  updateUsersList,
};
