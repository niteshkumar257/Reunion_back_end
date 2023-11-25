import { House } from "../Models/house.models.js";
import mongoose from "mongoose";

const addHouse = async (req, res) => {
  try {
    const {
      houseName,
      price,
      ownBy,
      image,
      feature,
      address,
      availableDate,
      category,
    } = req.body;

    const newHouse = new House({
      houseName,
      price,
      ownBy,
      image,
      feature,
      address,
      availableDate,
      category,
    });

    const savedHouse = await newHouse.save();
    res.json({ message: "new house create", houseDetails: savedHouse });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getHouse = async (req, res) => {
  try {
    const {name, city, category, maxPrice, minPrice, date,time } = req.query;
    console.log(category);

    const query = {};

    if (city) {
      query["address.city"] = city;
    }

    if (category) {
      query["category"] = category;
    }

    if (minPrice !== undefined && maxPrice !== undefined) {
      query["price"] = { $gte: minPrice, $lte: maxPrice };
    }

    if (date) {
      query["availableDate"] = { $lt: date };
    }

    console.log("query", query);
    
    const allhouses = await House.find(query);
  
    res.json({ allhouses: allhouses });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


const getOwnHouse = async (req, res) => {
  try {
    const { city, category, maxPrice, minPrice, date } = req.query;
    const { user_id } = req.params;
    const query = {};
    if (city) {
      query["address.city"] = city;
    }
    if (category) {
      query["category"] = category;
    }
    if (user_id) {
      query["ownBy"] = user_id;
    }
    if(date)
    {
      query['availableDate']={ $lt: new Date(date) }
    }

    if (minPrice && maxPrice) {
      query.price = { $gte: minPrice, $lte: maxPrice };
    } else if (minPrice) {
      query.price = { $gte: minPrice };
    } else if (maxPrice) {
      query.price = { $lte: maxPrice };
    }

  console.log(query);

    const allhouses = await House.find(query);
    res.json({ allhouses: allhouses });
  } catch (error) {
    res.json({ error: error.message });
  }
};
const updateHouse = async (req, res) => {
  try {
    const { house_id } = req.params;
    let { userId } = req.user;
    const updateFields = { $set: req.body };
    const house = await House.findOne({ _id: house_id });
    const houseOwnerId = new mongoose.Types.ObjectId(house.ownBy);
    userId = new mongoose.Types.ObjectId(userId);
    const isOwner = houseOwnerId.equals(userId);
    if (!house) res.status(404).json({ message: "No house exits" });
    else if (isOwner) {
      const updatedHouse = await House.findOneAndUpdate(
        { _id: house_id, ownBy: userId },
        updateFields,
        { new: true }
      );
      res.status(200).json({ updatedHouse: updatedHouse });
    } else {
      res
        .status(403)
        .json({ message: "You are not allowed Update house Details" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteHouse = async (req, res) => {
  try {
    const { house_id } = req.params;
    const { userId } = req.user;
    const house = await House.findOne({ _id: house_id });
    // house does not exits then return
    if (!house) res.status(400).json({ message: "House doesnot exits" });
    else {
      // house exits

      const houseOwenerId = new mongoose.Types.ObjectId(house.ownBy);
      const ownerId = new mongoose.Types.ObjectId(userId);
      const isOwnhouse = houseOwenerId.equals(ownerId);

      if (isOwnhouse) {
        const deletedHouse = await House.findByIdAndDelete(house_id);
        res.status(200).json({ message: "house delted succefully" });
      } else {
        res.json({ message: "It is not your house" });
      }
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateImage=async(req,res)=>{
  const {house_id}=req.params;

  try{

    // fetch house with the house_id
    const house=House.findOne({_id:house_id});
    if(!house)
    {
      return res.status(404).json({message:"No house exits"});
    }
    else 
    {
      // update the house Image

    }

    

  }catch{

    return res.status(500).json({error:"Something went wrong"});

  }

}
export { addHouse, getHouse, updateHouse, deleteHouse, getOwnHouse ,updateImage};
