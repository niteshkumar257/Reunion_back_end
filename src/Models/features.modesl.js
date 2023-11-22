import mongoose from "mongoose";

const featureSchema=new mongoose.Schema({
    noBedroom:{
        type:Number,
        required:true

    },
    noBathroom:{
        type:Number,
        required:true
    },
    length:{
        type:Number,
        required:true
    },width:{
        type:Number,
        required:true
    }
})

export const Feature=mongoose.model('Feature',featureSchema)