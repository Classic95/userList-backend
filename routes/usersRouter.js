var express = require('express');
var router = express.Router();
const userscontroller = require("../controllers/userController");

/* GET users listing. */
router.get('/', userscontroller.getUserProfile);

module.exports = router;
