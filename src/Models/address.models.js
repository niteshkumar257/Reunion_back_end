import mongoose from "mongoose";
const addSchema=new mongoose.Schema({
    placeName:{
        type:String,
        required:true,
    },
    city:{
        type:String,
        required:true
    },
    country:{
        type:String,
        required:true
    }

})

export const Address=mongoose.model('Address',addSchema);