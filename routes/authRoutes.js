const express=require('express')
const { registerController, loginController, currentUserController } = require('../controllers/authcontroller');
const authMiddleware = require('../middlewares/authMiddleware');
const router=express.Router()
//routes
router.post('/register',registerController)
// Login
router.post('/login',loginController);

//GET CURRENT USER
router.get('/current-user',authMiddleware,currentUserController)
module.exports=router