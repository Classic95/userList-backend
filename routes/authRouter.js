var express = require('express');
var router = express.Router();
const authcontroller = require("../controllers/authController");

/* GET users listing. */
router.post('/login', authcontroller.login);

module.exports = router;
