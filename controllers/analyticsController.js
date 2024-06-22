const inventoryModel = require("../models/inventoryModel");
const mongoose=require('mongoose')

//GET BLOOD DATA
const bloodGroupDetailsController=async(req,res)=>{
    try{
       const bloodGroups=['O+','O-','AB-','AB+','A+','A-','B+','B-'];
       const bloodGroupData=[];
       const organisation=new mongoose.Types.ObjectId(req.body.userId);
       //GET SINGLE BLOOD GROUP
       await Promise.all(bloodGroups.map(async(bloodGroup)=>{
        //Count Total IN
        const totalIn=await inventoryModel.aggregate([
            {
                $match:{
                    bloodGroup:bloodGroup,
                    inventoryType:'in',
                    organisation,
                }
            },
            {
                $group:{
                    _id:null,
                   total:{$sum:'$quantity'}
                }
            }
        ])

        //Count Total Out
        const totalOut=await inventoryModel.aggregate([
            {
                $match:{
                    bloodGroup:bloodGroup,
                    inventoryType:'out',
                    organisation,
                }
            },
            {
                $group:{
                    _id:null,
                   total:{$sum:'$quantity'}
                }
            }
        ])
        //Calculate Total
        const availableBlood=(totalIn[0]?.total||0)-(totalOut[0]?.total||0);
        //PUSH DATA
        bloodGroupData.push({
            bloodGroup,
            totalIn:totalIn[0]?.total||0,
            totalOut:totalOut[0]?.total||0,
            availableBlood,
        });
       }));
       return res.status(200).send({
        success:true,
        message:"Blood Group data fetched successfully",
        bloodGroupData,
       })
    }
    catch(error){
        console.log(error);
        return res.status(500).send({
            success:true,
            message:"Error in bloodgroup analytics API",
            error,
        })
    }
}

module.exports={bloodGroupDetailsController}