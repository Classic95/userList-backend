var express = require('express');
var router = express.Router();
const userscontroller = require("../controllers/userController");
const auth = require("../middleware/auth");

/* GET users listing. */
router.get('/list', auth.verifyToken, userscontroller.getUsersList);
router.get('/:id', auth.verifyToken, userscontroller.getUserProfile);
router.post('/', auth.verifyToken, userscontroller.addUsersList);
router.patch('/:id', auth.verifyToken, userscontroller.updateUsersList);

module.exports = router;
