const mongoose  = require("mongoose");
const inventoryModel = require("../models/inventoryModel");
const  userModel=require("../models/userModel");
//CREATE INVENTORY
const createInventoryController=async(req,res)=>{
    try{
        //  const {email}= req.body;
        //validation 
        const user= await userModel.findOne({Email:req.body.Email})
        if(!user){
             throw new Error('user Not Found')
        }
    //     if(inventoryType==="in" && user.Role!=='donar'){
    //          throw new Error('Not a Donar Account')
    //     }
    //     if(inventoryType==='out' && user.Role!=='hospital'){
    //   throw new Error('Not a hospital')
    //     }

    if(req.body.inventoryType==='out'){
        const requestedBloodGroup=req.body.bloodGroup
        const requestedQuantityofBlood=req.body.quantity
        const organisation=new mongoose.Types.ObjectId(req.body.userId)
        //calculate blood quantity
        const totalInofRequestedBlood=await inventoryModel.aggregate([
            {
                $match:{
                    organisation,
                    inventoryType:'in',
                    bloodGroup:requestedBloodGroup
                }
            },
            {
                $group:{
                    _id: "$bloodGroup",
                    total: { $sum: "$quantity" },
                }
            }
        ])
        // console.log("Total In" ,totalInofRequestedBlood)
        const totalIn = totalInofRequestedBlood[0]?.total || 0;
        //calculate OUT Blood Quanitity
  
        const totalOutOfRequestedBloodGroup = await inventoryModel.aggregate([
          {
            $match: {
              organisation,
              inventoryType: 'out',
              bloodGroup: requestedBloodGroup,
            },
          },
          {
            $group: {
              _id: "$bloodGroup",
              total: { $sum: "$quantity" },
            },
          },
        ]);
        const totalOut = totalOutOfRequestedBloodGroup[0]?.total || 0;
  
        //in & Out Calc
        const availableQuanityOfBloodGroup = totalIn - totalOut;
        //quantity validation
        if (availableQuanityOfBloodGroup < requestedQuantityofBlood) {
          return res.status(500).send({
            success: false,
            message: `Only ${availableQuanityOfBloodGroup}ML of ${requestedBloodGroup.toUpperCase()} is available`,
          });
        }
        req.body.hospital = user?._id;
      } else {
        req.body.donar = user?._id;
      }
    

        // save record
         const inventory=new inventoryModel(req.body)
            await inventory.save()
            return res.status(201).send({
                 success:true,
                 message:"New Blood Record Added"
            });
    }
    catch(error){
        console.log(error)
        return res.status(500).send({
            success:false,
            message:'Error in create inventory API',
            error
        })
    }
};
// GET ALL BLOOD RECORDS
 const getInventoryController=async(req,res)=>{
    try{
        const inventory=await inventoryModel.find({organisation:req.body.userId}).populate('donar').populate('hospital').sort({createdAt:-1});
       return  res.status(200).send({
            success:true,
            message:"Got all records successfully",
            inventory
        }); 
        
    }
    catch(error){
        console.log(error)
        return res.status(500).send({
            success:false,
            message:'Error in get all Inventory',
            error
        })
    }

 }
 // GET HOSPITAl BLOOD RECORDS
 const getInventoryHospitalController=async(req,res)=>{
  try{
      const inventory=await inventoryModel.find(req.body.filters).populate('donar').populate('hospital').populate('organisation').sort({createdAt:-1});
     return  res.status(200).send({
          success:true,
          message:"Got hospital consumer records successfully",
          inventory
      }); 
      
  }
  catch(error){
      console.log(error)
      return res.status(500).send({
          success:false,
          message:'Error in get consumer Inventory',
          error
      })
  }

}

//Get blood records of 3

const getRecentInventoryController=async(req,res)=>{
  try{
    const inventory=await inventoryModel.find({
      organisation:req.body.userId
    }).limit(3).sort({createdAt:-1})
    return res.status(200).send({
      success:true,
      message:"Recent Inventory Data",
      inventory,
    })
  }
  catch(error){
    console.log(error)
    return res.status(500).send({
      success:true,
      message:"Error in Recent Inventory API",
      error,
    })
  }
}

 //Get Donar Records
 const getDonarController=async(req,res)=>{
  try{
      const organisation= req.body.userId;
      //find donars
      const donarId=await inventoryModel.distinct("donar",{
        organisation,
      });
      console.log(donarId);
      const donars=await userModel.find({_id:{$in:donarId}})
      return res.status(200).send({
        success:true,
        message:"Donar record fetched successfully",
        donars,
      })
  }
  catch(error){
    console.log(error);
    return res.status(500).send({
      success:false,
      message:"Error in donar records",
      error
    })
  }
 }

 //  //GET HOSPITAL RECORDS
 const getHospitalController=async(req,res)=>{
  try{
      const organisation =req.body.userId;
      //GET HOSPITAL ID
      const hospitalId=await inventoryModel.distinct('hospital',{organisation});
      // FIND HOSPITALS
      const hospitals=await userModel.find(
        {
          _id:{$in:hospitalId},
        }
      );
      return res.status(200).send({
        success:true,
        message:"Hospitals data fetched successfully",
        hospitals,
      })
  }
  catch(error){
    console.log(error)
    return res.status(500).send({
      success:false,
      message:"Error in get hospital API",
      error
    })
  }

 }

  //GET ORG profiles
 const getOrganisationController=async(req,res)=>{
  try{
   const donar=req.body.userId;
   const orgID=await inventoryModel.distinct('organisation',{donar});
   //FIND ORG
   const organisations= await userModel.find({
    _id:{$in:orgID},
   })
   return res.status(200).send({
    success:true,
    message:"ORG data fetched successfully",
    organisations,
   })
  }

  catch(error){
    console.log(error);
    return res.status(500).send({
      success:true,
      message:"Error in ORG API",
      error
    })
  }
 }

 //GET ORG for hospital profiles
 const getOrganisationForHospitalController=async(req,res)=>{
  try{
   const hospital=req.body.userId;
   const orgID=await inventoryModel.distinct('organisation',{hospital});
   //FIND ORG
   const organisations= await userModel.find({
    _id:{$in:orgID},
   })
   return res.status(200).send({
    success:true,
    message:"Hospital ORG data fetched successfully",
    organisations,
   })
  }

  catch(error){
    console.log(error);
    return res.status(500).send({
      success:true,
      message:"Error in Hospital ORG API",
      error
    })
  }
 }
module.exports={createInventoryController,getInventoryController,getDonarController,getHospitalController,getOrganisationController,
  getOrganisationForHospitalController,
  getInventoryHospitalController,
  getRecentInventoryController
};