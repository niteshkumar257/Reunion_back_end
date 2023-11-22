import mongoose from "mongoose";

const houseCategories = ['Apartment', 'House', 'Condo'];
const houseSchema=new mongoose.Schema({
      houseName:{
        type:String,
        required:true,

      },
      price:{
        type:Number,
        required:true
      },
      ownBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
      },
      image:{
        type:String,
        required:true,
      },
      Feature:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Feature"
      },
      Address:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Address"
      },
      AvailableDate:{
        type:Date,
        required:true
      },
      category: {
        type: String,
        enum: houseCategories, 
        required: true,
      },

},{
    timestamps:true
})

export const House=mongoose.model('House',houseSchema);