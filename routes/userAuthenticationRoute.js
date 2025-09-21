const express = require('express')
const router = express.Router();
const userAuthenticationController = require('../controller/userAuthenticationController')

router.route('/')
        .post(userAuthenticationController.handleUserAuthentication)


module.exports = router;