const userModel = require("../models/userModel")
//GET DONAR LIST
const getDonarListController=async(req,res)=>{
    try{
       const donarData=await userModel.find({
        Role:'donar'
       }).sort({
        createdAt:-1
       })
       return res.status(200).send({
        success:true,
        TotalCount:donarData.length,
        message:"Donar Data Fetched successfully",
        donarData,
       })
    }
    catch(error){
        console.log(error)
        return res.status(500).send({
            success:false,
            message:"Error in DonarList API",
            error,
        })
    }
}
//GET HOSPITAL LIST

const getHospitalListController=async(req,res)=>{
    try{
       const hospitalData=await userModel.find({
        Role:'hospital'
       }).sort({
        createdAt:-1
       })
       return res.status(200).send({
        success:true,
        TotalCount:hospitalData.length,
        message:"Hospital Data Fetched successfully",
        hospitalData,
       })
    }
    catch(error){
        console.log(error)
        return res.status(500).send({
            success:false,
            message:"Error in DonarList API",
            error,
        })
    }
}

//GET ORG LIST


const getOrgListController=async(req,res)=>{
    try{
       const orgData=await userModel.find({
        Role:'organisation'
       }).sort({
        createdAt:-1
       })
       return res.status(200).send({
        success:true,
        TotalCount:orgData.length,
        message:"Organisation Data Fetched successfully",
        orgData,
       })
    }
    catch(error){
        console.log(error)
        return res.status(500).send({
            success:false,
            message:"Error in DonarList API",
            error,
        })
    }
}
// *********************************
const deleteDonarController=async(req,res)=>{
    try{
          await userModel.findByIdAndDelete(req.params.id);
          return res.status(200).send({
            success:true,
            message:"Record Data deleted succesfully",

          })
    }
    catch(error){
        console.log(error)
        return res.status(500).send({
            success:false,
            message:"Error while deleting Record",
            error,
        })
    }

}

//Export
module.exports={getDonarListController,getHospitalListController,getOrgListController,deleteDonarController}