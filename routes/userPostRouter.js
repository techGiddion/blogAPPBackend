const express = require('express')
const router = express.Router()
const userPostController = require('../controller/userPostController')
const ROLE_LIST = require('../config/roleList.js')
const verifyRoles = require('../middleware/verifyRoles.js')
const verifyJWT = require('../middleware/verifyJWT')

router.route('/')
        .get(userPostController.getAllPost)
        .post(verifyJWT,userPostController.createUserPost)
        // .put(verifyRoles(ROLE_LIST.Admin,ROLE_LIST.User),userPostController.updateUserPost)
        // .delete(verifyRoles(ROLE_LIST.Admin,ROLE_LIST.User),userPostController.deleteUserPost)

router.route('/:id')
        .get(userPostController.getPostById)
        .put(verifyJWT,verifyRoles(ROLE_LIST.Admin,ROLE_LIST.User),userPostController.updateUserPost)
        .delete(verifyJWT,verifyRoles(ROLE_LIST.Admin,ROLE_LIST.User),userPostController.deleteUserPost)



module.exports = router;