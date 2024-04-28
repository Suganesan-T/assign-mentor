//import express
const express = require('express');

//import controller
const { addstudentData, studentsWithNoMentor, getStudent, updateStudent, getPreviousMentor, getAllStudents } = require('../controllers/studentController');

const router = express.Router()

//To add new student data
router.post("/", addstudentData)
//To get students with no mentor
router.get("/noMentor", studentsWithNoMentor);

//To get specific student based on id
router.get("/:id", getStudent);

//To assign one student to one mentor
router.put("/:id", updateStudent);

//To get previous mentor
router.get("/previousMentor/:studentId", getPreviousMentor);

// To get students with no mentor
router.get("/", getAllStudents);

module.exports = router