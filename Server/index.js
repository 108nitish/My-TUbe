import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import userRoutes from "./routes/user.js";
import commentRoutes from "./routes/comments.js";
import videoRoutes from "./routes/video.js";
import authRoutes from "./routes/auth.js";
import cors from "cors"; 


const app = express();
dotenv.config();
 
const connect = async() =>{
    mongoose.connect(process.env.MONGODB_URI).then(() =>{
        console.log("Connected To MONGO DB!!")
    }).catch((err)=>{
        throw err;
    });
};


app.use(cookieParser());
app.use(express.json()); 
app.use(cors({
    origin: 'http://localhost:5173',  
    credentials: true, 
  })); 


app.use("/api/users",userRoutes);
app.use("/api/comments",commentRoutes);
app.use("/api/videos",videoRoutes);
app.use("/api/auth",authRoutes);

app.get("/", (req, res)=>{
    res.send("Hello");
})

app.use((err,req,res,next) => {
    const status = err.status || 500;
    const message = err.message || "Something went wrong Abruptly";
    return res.status(status).json({
        success: false,
        status,
        message
    })

})


app.listen(8080, ()=>{
    connect();
    console.log("Connected to Server!!");
})