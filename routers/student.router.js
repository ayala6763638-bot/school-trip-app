import { Router } from "express";
import studentModel from "../models/student.model.js";
import studentValidation from "../validations/studentValidation.js";
import validateRequest from "../middlewares/validate.middlewares.js";

const studentRouter=Router();

//add student to the app  
studentRouter.post("/add",validateRequest(studentValidation),async(req,res)=>{
    try{
       const newstudent=new studentModel(req.body);
       await newstudent.save();
       return res.status(201).json({message: "the student was added successfully",student: newstudent});
    } catch(error)
    {
      return res.status(500).json({message: "error in the added", error: error.massage});
    }
    res.send();
});

//get students from classnamesesw teacher
studentRouter.get("/class/:className",async(req,res)=>{
    try{
        const className=req.params.className;
        const students= await studentModel.find({className: className});
        return res.status(200).json(students);
    } catch(error)
    {
        return res.status(500).json({message: "error getting students"});
    }
});

export default studentRouter;


