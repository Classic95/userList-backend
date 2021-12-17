var express = require('express');
var router = express.Router();
const userscontroller = require("../controllers/userController");

/* GET users listing. */
router.get('/list', userscontroller.getUsersList);
router.get('/:id', userscontroller.getUserProfile);
router.post('/', userscontroller.addUsersList);
router.patch('/:id', userscontroller.updateUsersList);

module.exports = router;
