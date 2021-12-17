var express = require('express');
var router = express.Router();
const authRouter = require("./authRouter");
const usersRouter = require("./usersRouter");

/* GET home page. */
router.use('/auth', authRouter);
router.use('/user', usersRouter);

// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });

module.exports = router;
