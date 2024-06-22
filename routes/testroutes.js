const express=require('express');
const { testcontroller } = require('../controllers/testcontollers');

//router object
const router=express.Router();
//routes
router.get('/',testcontroller)
//export
module.exports=router;