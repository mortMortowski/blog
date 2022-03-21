<<<<<<< HEAD
const {Router} = require("express");
const authController = require('../controllers/authController');

const router = Router();

router.get('/login', authController.login_get);

router.get('/signup', authController.signup_get);

router.get('/logout', authController.logout_get);

router.post('/login', authController.login_post);

router.post('/signup', authController.signup_post);

=======
const {Router} = require("express");
const authController = require('../controllers/authController');

const router = Router();

router.get('/login', authController.login_get);

router.get('/signup', authController.signup_get);

router.post('/login', authController.login_post);

router.post('/signup', authController.signup_post);

>>>>>>> 4bb19d2e241ffec822f7ed907735e18f84e2ced0
module.exports = router;