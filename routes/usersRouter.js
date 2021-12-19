var express = require('express');
var router = express.Router();
const userscontroller = require("../controllers/userController");
const auth = require("../middleware/auth");
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // console.log('file----', file)
    cb(null, 'views')
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + path.extname(file.originalname)
    console.log('file----', file, uniqueSuffix)
    cb(null, file.fieldname + '-' + uniqueSuffix)
  }
})

const upload = multer({ storage: storage })

/* GET users listing. */
router.get('/list', auth.verifyToken, userscontroller.getUsersList);
router.get('/graph', auth.verifyToken, userscontroller.getUsersGraph);
router.get('/:id', auth.verifyToken, userscontroller.getUserProfile);
router.post('/', auth.verifyToken, upload.single('avatar') , userscontroller.addUsers);
router.patch('/:id', auth.verifyToken, upload.single('avatar'), userscontroller.updateUsers);

module.exports = router;
