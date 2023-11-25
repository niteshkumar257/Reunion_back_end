import mongoose from "mongoose";

const userSchema=new mongoose.Schema({
     email:{
        type:String,
        required:true,
        unique:true
     },
     password:{
        type:String,
        required:true,
        
     },
     isOwner:{
      type:Boolean,
      default:true,
     }
})
export const  User=mongoose.model('User',userSchema);