//require express
const express = require('express');

//import studentRouter router
const studentRouter = require('./routes/studentRoute');
//import mentorRouter router
const mentorRouter = require('./routes/mentorRoute');

//create express app
const app = express();

//use express json middleware
app.use(express.json());

//define endpoints
app.use('/api/students', studentRouter);
app.use('/api/mentors', mentorRouter);



//export app module
module.exports = app;