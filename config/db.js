const mongoose=require('mongoose')
const colors=require('colors')
const connectDB=async()=>{
    try{
    await mongoose.connect(process.env.MONGO_URL)
    console.log(`Connected to MONGODB database ${mongoose.connection.host}`.bgYellow.blue)
    }
    catch(error){
      console.log(`Mongo DB error ${error}`.bgMagenta.white)
    }
}
module.exports=connectDB
