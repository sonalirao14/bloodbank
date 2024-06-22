const express=require("express") ;
const dotenv=require('dotenv');
const colors=require('colors')
const morgan=require('morgan')
const cors=require('cors');
const connectDB = require("./config/db");
const path=require('path');
const PORT=process.env.PORT||8080;
//dot config
dotenv.config();
//Mongo DB connection
connectDB();
//Rest object
const app=express();
//middlewares
app.use(express.json())
app.use(cors())
app.use(morgan('dev'))
//routes
//1 test route
app.use("/api/v1/test",require("./routes/testroutes"));
app.use("/api/v1/auth",require("./routes/authRoutes"));
app.use("/api/v1/inventory",require("./routes/inventoryRoutes"));
app.use("/api/v1/analytics",require("./routes/analyticsRoutes"));
app.use("/api/v1/admin",require("./routes/adminRoutes"));

//static folders
app.use(express.static(path.join(__dirname,'./client/build')))
//static routes
// app.get("*",function(req,res){
//     res.sendFile(path.join(__dirname,"./client/build/index.html"))
// })
// port

app.listen(PORT,()=>{
    console.log(`Node server running in ${process.env.DEV_MODE} on port ${process.env.PORT}`.bgBlue.white);
});
