const mongoose=require('mongoose')
const userschema=new mongoose.Schema({
    Role:{
        type:String,
        required:[true,'role is required'],
        enum:['admin','organisation','hospital','donar'],
    },
    Name:{
     type: String,
     required:function(){
        if(this.Role==='donar'||this.Role==='admin'){
            return true
        }
        return false
     }
    },
    organisationName:{
    type: String,
    required:function(){
        if(this.Role==='organisation'){
        return true;
    }
    return false;
    }
    },
    hospitalName:{
        type:String,
        required:function(){
            if(this.role==='hospital'){
                return true;
            }
            return false;
        }
    },
    Email:{
        type:String,
        required:[true,'email is required'],
        unique:true
    },
    Password:{
        type:String,
        // required:[true,'password is must'],
    },
    AadharNo:{
        type:String,
        required:[true,'Id is must for all'],
    },
    Address:{
        type:String,
        required:[true,'Address is required'],
    },
    MobileNo:{
        type:String,
        required:[true,'Mobile no is required'],
    },

},
{
    timestamps:true
});
module.exports=mongoose.model("users",userschema);