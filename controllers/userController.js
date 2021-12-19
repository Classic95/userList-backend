const { status } = require("../constants/constants");
const Users = require("../models/Users");
const utility = require("../helpers/utility");

const getUserProfile = async (req, res) => {
  try {
    const { id } = req.params;
    let user = {};
    // let userModel = new Users(user);
    let userModel = await Users.findOne({
      _id: id,
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

const getUsersList = async (req, res) => {
  try {
    let userModel = await Users.find({ name: { $ne: "Admin" } });
    if (userModel) {
      return res
        .status(status.SUCCESS)
        .send(utility.successRes("Success", userModel));
    }
    return res.status(status.ERROR).send(utility.errorRes("ERROR"));
  } catch (error) {
    // console.log('error-----', error)
    return res.status(status.ERROR).send(utility.errorRes("ERROR"));
  }
};

const addUsers = async (req, res) => {
  try {
    const { name, email, dob, address, country } = req.body;
    // const avatar = req.file.filename;
    const avatar = `${req.file.filename}`;

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

const updateUsers = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, dob, address, country } = req.body;
    // const avatar = `http://localhost:3000/${req.file.filename}`;
    const avatar = `${req.file.filename}`;
    console.log('avatar---', avatar);
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

const getUsersGraph = async (req, res) => {
  try {
    let userModel = await Users.aggregate([
      { $unwind: "$country" },
      { $sortByCount: "$country" },
    ]);
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
  addUsers,
  updateUsers,
  getUsersGraph,
};
