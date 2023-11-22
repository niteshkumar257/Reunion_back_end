import express from "express";
import dotenv from "dotenv";
import connectDb from "./Db/index.js";
dotenv.config({
  path: "./env",
});

const app = express();

const port = process.env.PORT || 3000;

app.get("/", (req, res) => {
  console.log("home route");
});

connectDb().then(()=>{
    app.listen(port, () => {
        console.log("server Started", port);
      });
    
}).catch((err)=>{

    console.log("Server unable to connect with Db");

})

