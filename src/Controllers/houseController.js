
import { House } from "../Models/house.models.js";

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

    console.log(houseName,price,ownBy,image,feature,address,availableDate,category);

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
    res.json({"message":"new house create","houseDetails":savedHouse});
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getHouse = async (req, res) => {
  try {

    const {city,category}=req.query;
    const query = {};
    if (city) {
      query['address.city'] = city;
    }
    if (category) {
      query['category'] = category;
    }

    let houses;
    console.log(query);
    if(query)
    {
      houses=await House.find(query);
      
    }
    else 
    {
 houses = await House.find();
    }
    
    
    res.json({"allhouses":houses});
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getOwnHouse=async(req,res)=>{
    try{
        const {city,category}=req.query;
        const {user_id}=req.params;
        const query={};
        if(city)
        {
            query['address.city']=city
        }
        if(category)
        {
            query['catergory']=category
        }
        if(user_id)
        {
            query['ownBy']=user_id
        }
        
        const allhouses=await House.find(query);
        res.json({'allhouses':allhouses});


    }catch(error){

       res.json({error:error.message});
    }
}
const updateHouse = async (req, res) => {
  try {
    const { house_id } = req.params;
    const updatedHouse = await House.findByIdAndUpdate(
      house_id,
      { $set: req.body },
      { new: true }
    );
    res.json({"message":"house details updated","updatedHouse":updatedHouse});
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteHouse = async (req, res) => {
  try {
    const { house_id } = req.params;
    const deletedHouse = await House.findByIdAndDelete(house_id);
    res.json(deletedHouse);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export { addHouse, getHouse, updateHouse, deleteHouse ,getOwnHouse};
