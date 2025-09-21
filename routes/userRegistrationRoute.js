const express = require('express')
const router = express.Router()
const userRegistrationController = require('../controller/userRegistrationController')

router.route('/')
        .post(userRegistrationController.handleUserRegistration)

module.exports = router;
