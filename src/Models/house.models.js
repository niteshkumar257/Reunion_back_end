import mongoose from "mongoose";

const houseCategories = ['Apartment', 'House', 'Condo'];

const featureSchema = new mongoose.Schema({
  noBedroom: {
    type: Number,
    required: true,
  },
  noBathroom: {
    type: Number,
    required: true,
  },
  length: {
    type: Number,
    required: true,
  },
  width: {
    type: Number,
    required: true,
  },
});

const addressSchema = new mongoose.Schema({
  placeName: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
});
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
     
      feature: featureSchema, 
      address: addressSchema,
      availableDate:{
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