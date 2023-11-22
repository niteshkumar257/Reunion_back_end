import express from "express";
import dotenv from "dotenv";
import connectDb from "./Db/index.js";
import userRoutes from "./Routes/userRoutes.js";
import houseRoutes from "./Routes/houseRoutes.js"
import cors from "cors"
dotenv.config({
  path: "./env",
});

const app = express();
app.use(express.json());
app.use(cors());

app.use(express.urlencoded({ extended: true })); 

const port = process.env.PORT || 3000;

app.use('/api/v1/user',userRoutes);
app.use('/api/v1/house',houseRoutes);

connectDb().then(()=>{
    app.listen(port, () => {
        console.log("server Started", port);
      });
    
}).catch((err)=>{

    console.log("Server unable to connect with Db");

})

