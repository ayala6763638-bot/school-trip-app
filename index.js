import express from 'express';
import studentRouter from './routers/student.router.js';
import cors from 'cors';
import mongoose from 'mongoose';

const port=5000;
const MONGO_URI = "mongodb://localhost:27017/SchoolTripsDB";
mongoose.connect(MONGO_URI).then(() => console.log("Connected to MongoDB"))
.catch((err) => console.error("Connection error:", err));
const app=express();//object for the project
app.use(cors());
app.use(express.json());
app.use('/students',studentRouter);
app.listen(port,()=>{
    console.log(`the app runing on http://localhost:${port}`);
});
