const mongoose=require('mongoose');

console.log("MONGO_URI =", process.env.PORT);
console.log("MONGO_URI =", process.env.JWT_SECRET);
console.log("MONGO_URI =", process.env.MONGO_URI);

const dbConnect = async()=>{
  try{
   const connect=await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB connected: ${connect.connection.host},${connect.connection.name}`);
  } catch(error){
    console.error(error);
    process.exit(1);
  }
}
module.exports=dbConnect;