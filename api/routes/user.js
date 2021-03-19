const express =require('express');
const router =express.Router();

const CheckAuth = require('../middleware/check-auth');
const UserController = require("../controllers/users")

router.post('/signup',UserController.user_Signup)

router.post("/login",UserController.user_Login)

router.delete('/:userId',CheckAuth,UserController.user_Delete)


module.exports = router;