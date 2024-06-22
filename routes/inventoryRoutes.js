const express=require('express')
const authMiddleware = require('../middlewares/authMiddleware')
const { createInventoryController, getInventoryController,  getDonarController, getHospitalController, getOrganisationController, getOrganisationForHospitalController, getInventoryHospitalController, getRecentInventoryController } = require('../controllers/inventorycontoller')
const router=express.Router()
//routes
// ADD INVENTORY || POST
router.post('/create-inventory',authMiddleware,createInventoryController)
//GET ALL BLOOD RECORDS
router.get('/get-inventory',authMiddleware,getInventoryController)
//GET RECENT BLOOD RECORDS
router.get('/get-recent-inventory',authMiddleware,getRecentInventoryController)
//GET HOSPITAL BLOOD RECORDS
router.post('/get-inventory-hospital',authMiddleware,getInventoryHospitalController)
//GET donar records
router.get('/get-donars',authMiddleware,getDonarController)
// //GET Hospitals records
router.get('/get-hospitals',authMiddleware,getHospitalController)
// //GET Organisation records
router.get('/get-organisation',authMiddleware,getOrganisationController)
//GET Organisation records
 router.get('/get-organisation-for-hospital',authMiddleware,getOrganisationForHospitalController)
module.exports = router