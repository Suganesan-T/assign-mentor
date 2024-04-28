const express = require("express");

//import mentorController
const { addMentorsData, getAllMentor, updateMentor, getSpecificMentor } = require("../controllers/mentorController");

const router = express.Router();

//Creating a mentors data
router.post('/', addMentorsData);

//Getting all mentor
router.get('/', getAllMentor);

//Selecting one mentor and assigning multiple students
router.put('/:mentorId', updateMentor);

//To get details of specific mentor
router.get('/:mentorId', getSpecificMentor)

module.exports = router;