import mongoose from "mongoose";
import { DB_Name } from "../Constants/constant.js";

const connectDb = async () => {
  try {
    const connectionInfo =await mongoose.connect(
      `${process.env.MONGO_URI}/${DB_Name}`
    );
     console.log(`Db connected ${connectionInfo.connection.host}`)
  } catch (err) {
    console.log(`Error in database connection , ${err}`);
    process.exit(1);
  }
};

export default connectDb;
