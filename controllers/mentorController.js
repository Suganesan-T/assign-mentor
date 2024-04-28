const Student = require('../Models/studentModel');
const Mentor = require('../Models/mentorModel');



const addMentorsData = async (req, res) => {
    try {
        if (req.body.students) {

            //The student id's which we give while creating mentor.
            const studentIds = req.body.students;
            let existingStudents;
            try {
                existingStudents = await Student.find({ _id: { $in: studentIds } });
            } catch (error) {
                return res.status(404).send({message: "One or more student id is not a object reference of student collection."})
            }

            //To find if the student is already assigned to any mentor
            const studentsWithAnotherMentor = await Mentor.findOne({students: {$in: studentIds}})

            if (studentIds.length !== existingStudents.length) {
                const nonExistingStudentIds = studentIds.filter(id => !existingStudents.map(e => e._id.toString()).includes(id.toString()));
                return res.status(404).json({ message: "One or more students you assigned to the mentor is not available in the students record, please create the student and then assign it to the mentor.", nonExistingStudentIds });
            }else if(studentsWithAnotherMentor){
                return res.status(400).json({message: "One or more student is already associated with another mentor.", existingStudentWithAnotherMentor: studentsWithAnotherMentor})
            }else{
                //Updating the mentor in students collection
                studentIds.forEach( async (e) => {
                    await Student.updateOne({_id: e}, {$set: {mentor: req.body.mentorName}});
                })
            }
        }

        const newMentor = await Mentor.create(req.body);
        res.json({ message: "Mentor added successfully.", newMentor });
    } catch (error) {
        res.status(500).send({ message: "The mentor already available in a database", error });
    }
}

const getAllMentor = async (req, res) => {
    try {
        const mentors = await Mentor.find();
        res.json({ message: "Mentors data fetched successfully.", mentors });
    } catch (error) {
        res.status(500).send({ message: "Internal Server Error", error });
    }
}

const updateMentor = async (req, res) => {
    try {
        const mentorId = req.params.mentorId;
        const currentMentor = await Mentor.findOne({_id: mentorId});

        if (req.body.students) {
            //The student id's which we give while creating mentor.
            const studentIds = req.body.students;
            let existingStudents;
            try {
                existingStudents = await Student.find({ _id: { $in: studentIds } });
            } catch (error) {
                return res.status(404).send({message: "One or more student id is not a object reference of student collection."})
            }

            //To find if the student is already assigned to any mentor it doesn't include current mentorID
            const studentsWithAnotherMentor = await Mentor.findOne({_id: {$ne: mentorId}, students: {$in: studentIds}})

            if (studentIds.length !== existingStudents.length) {
                const nonExistingStudentIds = studentIds.filter(id => !existingStudents.map(e => e._id.toString()).includes(id.toString()));
                return res.status(404).json({ message: "One or more students you assigned to the mentor is not available in the students record, please create the student and then assign it to the mentor.", nonExistingStudentIds });
            }else if(studentsWithAnotherMentor){
                return res.status(400).json({message: "One or more student is already associated with another mentor.", existingStudentWithAnotherMentor: studentsWithAnotherMentor})
            }else{
                //Updating the mentor in students collection
                studentIds.forEach( async (e) => {
                    await Student.updateOne({_id: e}, {$set: {mentor: req.body.mentorName}});
                })
            }
        }

        await Mentor.updateOne({_id: mentorId}, {$set: req.body});
        res.json({ message: "Students assigned to mentor successfully." });
    } catch (error) {
        res.status(500).send({ message: "Internal server error", error });
    }
}

const getSpecificMentor = async (req, res) => {
    const mentorId = req.params.mentorId;

    const mentor = await Mentor.find({_id: mentorId});
    res.send({message: "Specific mentor retrieved successfully.", mentor});
}

module.exports = { addMentorsData, getAllMentor, updateMentor, getSpecificMentor };