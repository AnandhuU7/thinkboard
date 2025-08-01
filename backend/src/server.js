import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path"


import notesRoutes from "./routes/notesRoutes.js";
import { connectDB } from "./config/db.js";
import rateLimiter from "./middleware/rateLimiter.js";

dotenv.config();



const app = express();
const PORT = process.env.PORT || 5001;
const __dirname =path.resolve();


//middileware
if(process.env.NODE_ENV !== "production"){
app.use(cors(
    {
        origin: "http://localhost:5173"
    }
))
}

app.use(express.json());
app.use(rateLimiter);

// app.use((req,res,next)=>{
//     console.log(`req method is ${req.method} and ${req.url}`,)
//     next();
// })

app.use("/api/notes", notesRoutes);


if(process.env.NODE_ENV == "production")
{
    app.use(express.static(path.join(__dirname,'../frontend/dist')))
app.use("*",(req,res)=>{
    res.sendFile(path.join(__dirname,"../frontend","dist","index.html"));
})
}

connectDB().then(() => {
    app.listen(PORT, () => {
        console.log("Server running on port 5001");
    });
})
