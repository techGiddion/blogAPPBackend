const express = require('express')
const router = express.Router()
const userLogoutController = require('../controller/userLogoutController')

router.route('/')
        .get(userLogoutController.handleUserLogout)


module.exports = router