const express = require('express');
const router = express.Router();

const userCtrl = require('../controllers/user'); //importing the user controller

router.post('/signup', userCtrl.signup); //assigning the signup controller to signup route
router.post('/login', userCtrl.login); //assigning the login controller to login route

module.exports = router;
