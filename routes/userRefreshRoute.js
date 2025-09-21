const express = require('express')
const router = express.Router()
const userRefreshController = require('../controller/userRefreshController')

router.route('/')
        .post(userRefreshController.handleUserRefresh)


module.exports = router;