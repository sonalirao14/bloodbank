const express=require('express');
const authMiddleware = require('../middlewares/authMiddleware');
const { getDonarListController, getHospitalListController, getOrgListController, deleteDonarController } = require('../controllers/adminController');
const adminMiddleware = require('../middlewares/adminMiddleware');


//routerObject
const router=express.Router();

//ROUTES

//GET || DONARLIST
router.get("/donar-list",authMiddleware,adminMiddleware,getDonarListController);
//GET || HOSPITALLIST
router.get("/hospital-list",authMiddleware,adminMiddleware,getHospitalListController);
//GET || ORGLIST
router.get("/org-list",authMiddleware,adminMiddleware,getOrgListController);
//DELETE DONSR LIST
router.delete("/delete-donar/:id",authMiddleware,adminMiddleware,deleteDonarController)


//EXPORT
module.exports=router;