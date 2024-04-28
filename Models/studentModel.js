const mongoose = require('mongoose')

const StudentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    course: {
        type: String,
        required: true
    },
    mentor: {
        type: String,
        
    },
    previousMentor:{
        type: String
    }
})

//export module
module.exports = mongoose.model('Student', StudentSchema,'Students')