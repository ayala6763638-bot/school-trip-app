import { Router } from "express";
import studentModel from "../models/student.model.js";
import studentValidation from "../validations/studentValidation.js";
import validateRequest from "../middlewares/validate.middlewares.js";

const studentRouter = Router();

//add student to the app  
studentRouter.post("/add", validateRequest(studentValidation), async (req, res) => {
    try {
        const newstudent = new studentModel(req.body);
        await newstudent.save();
        return res.status(201).json({ message: "the student was added successfully", student: newstudent });
    } catch (error) {
        return res.status(500).json({ message: "error in the added", error: error.massage });
    }
    res.send();
});

//get students from classnamesesw teacher
studentRouter.get("/class/:className", async (req, res) => {
    try {
        const className = req.params.className;
        const students = await studentModel.find({ className: className });
        return res.status(200).json(students);
    } catch (error) {
        return res.status(500).json({ message: "error getting students" });
    }
});
//login
studentRouter.post("/login", async (req, res) => {
    try {
        const { id, firstName } = req.body;
        const student = await studentModel.findOne({ id: id, firstName: firstName });
        if (!student) {
            return res.status(401).json({ message: "error in the id or in the name" });
        }
        return res.status(200).json({ message: "login succesful" });
    } catch (error) {
        return res.status(500).json({ message: "server error" });
    }
});
//update location of the student
studentRouter.post("/add-location/:id", async (req, res) => {
    try {
        const studentId = req.params.id;
        const neaCoordinates = req.body.coordinates;
        const student = await studentModel.findOne({ id: studentId });
        if (!student) {
            return res.status(404).json({ message: "student not found" });
        }
        student.lastLocation = {
            coordinates: neaCoordinates,
            time: Date.now()
        };
        await student.save();
        return res.status(200).json({ message: "location updated successfully", student });
    } catch (error) {
        return res.status(500).json({ message: "error updating location", error: error.message });
    }
});
//get all students
studentRouter.get("/all", async (req, res) => {
    try {
        const students = await studentModel.find();
        return res.status(200).json(students);
    } catch (error) {
        return res.status(500).json({ message: "error getting students" });
    }
});


export default studentRouter;


