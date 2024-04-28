const Student = require('../Models/studentModel');
const Mentor = require('../Models/mentorModel');

const addstudentData = async (req, res) => {
    try {
        let newStudent;
        const { name, email, course, mentor, previousMentor } = req.body
        if (!mentor) {
            try {
                newStudent = await Student.create(req.body)
                return res.status(201).json({ message: "Student created successfully", data: newStudent })
            } catch (error) {
                return res.status(500).json({ message: "Something went wrong", error: error })
            }
        }
        let existingMentor = await Mentor.findOne({ name: mentor })
        console.log("Existing mentor:", existingMentor)
        if (!existingMentor) {
            existingMentor = await Mentor.create({
                name: mentor,
                students: []
            })
        }
        //creating a student record
        newStudent = await Student.create(req.body);

        existingMentor.students.push(newStudent._id);
        await existingMentor.save();

        res.status(201).json({ message: "Student created successfully.", data: newStudent })
    } catch (error) {
        res.status(500).json({ message: "Something went wrong", error: error })
    }
}

const getAllStudents = async (req, res) => {
    const students = await Student.find();
    res.status(200).send({
        message: "Data retrieved successfully.",
        data: students
    });
}

const getStudent = async (req, res) => {
    const id = req.params.id;
    let student;

    try {
        student = await Student.findOne({ _id: id });
    } catch (error) {
        return res.status(404).json({ message: "Student does not exist." });
    }

    res.json({ message: "Student fetched successfully.", data: student })

}

const updateStudent = async (req, res) => {
    const id = req.params.id;
    let newMentor;
    try {
        const existingStudent = await Student.findOne({ _id: id });
        console.log("existing Student", existingStudent)
        if (!existingStudent) {
            return res.status(404).send({ message: "This student does not exist, please input the correct student ID." });
        }

        //Checking if the mentor is changed.
        let updateFields;
        if (req.body.mentor !== existingStudent.mentor) {
            
            //Mentor changed, so assigning previous mentor
            const { name, email, mentor, course } = req.body;
            updateFields = {
                name, email, mentor, previousMentor: existingStudent.mentor, course
            }

            if (existingStudent.mentor !== "") {
                //Mentor is changed, so no longer this student should be in the Mentor's students list.
                const existingMentor = await Mentor.findOne({ mentorName: existingStudent.mentor });

                //Removing the student from the old mentor students array.
                const result = await Mentor.findByIdAndUpdate(
                    existingMentor._id,
                    { $pull: { students: id } },
                    { new: true }
                )
            }

            //This student needs to be added in the new mentor's students array(As reference).
            newMentor = await Mentor.findOne({ mentorName: mentor });
            if (!newMentor) {
                newMentor = await Mentor.create({
                    name: mentor,
                    students: []
                });
            }
            newMentor.students.push(id);
            await newMentor.save();
        } else {
            updateFields = req.body;
        }

        // Using try/catch for error handling
        try {
            const updatedStudent = await Student.findByIdAndUpdate(id, { $set: updateFields }, { new: true, useFindAndModify: false }).exec();

            // Checking if the update was successful
            if (!updatedStudent) {
                return res.status(404).send({ message: "Student not updated." });
            }

            res.status(200).send({ message: "The student record is updated.", updatedStudent });
        } catch (updateError) {
            res.status(500).send({ message: `Error while updating student: ${updateError.message}` });
        }
    } catch (error) {
        res.status(500).send({ message: `Error while finding student: ${error.message}` });
    }
}

const getPreviousMentor = async (req, res) => {
    const studentId = req.params.studentId;
    let student;

    try {
        student = await Student.findOne({_id: studentId });
        console.log("Student record: ", student);
    } catch (error) {
        return res.status(404).send({ message: "Student does not exist." })
    }

    if (!student.mentor && !student.previousMentor) {
        return res.status(404).send({message: "This student just joined, doesn't have a mentor as well as previous mentor."})
    }else if(!student.previousMentor && student.mentor !== ""){
        return res.status(404).send({ message: `This students doesn't have previous mentor, ${student.mentor} is the first mentor assigned to the student.` });
    }

    res.json({ message: "Previous mentor fetched successfully.", data: { currentMentor: student.mentor, previousMentor: student.previousMentor } });
}

const studentsWithNoMentor = async (req, res) => {
    // const students = await Students.find();
    const noMentor = await Student.find({mentor: ""});
    console.log("No mentor", noMentor);
    res.status(200).json({
        message: "Students with no mentor retrieved successfully.",
        data: noMentor
    });
}

//export modules
module.exports = { addstudentData, getAllStudents, getStudent, updateStudent, getPreviousMentor, studentsWithNoMentor }