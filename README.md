This project demonstrates the development of backend using Node.js with express.

We have 2 collections students and mentors, we have endpoints for CRUD operations.
There is a reference from students collection to mentors collection, when a student record is added with mentor, the specific mentor record will be created automatically if it's not created already and the students will be automatically added to Mentors.students array in database.

Also when a mentor changes for a student, that particular student id automatically removed from a mentors.students array and added to the new mentors.students array.

Here we can see what endpoints does what:

# For Students record:

## /api/students/ --> POST Request
    It's used to create students with the help of student schema.
## /api/students/ --> GET Request
    Which gets all student from a Students collection.
## /api/students/:studentId --> GET Request
    To get particular student from a Students collection.
## /api/students/previousMentor/:studentId --> GET Request
    To get previously assigned mentor.
## /api/students/noMentor --> GET Request
    To get students who has no mentor assigned
## /api/students/:studentId --> PUT Request
    To assign a mentor for a particular student and also you can update other students record.


# For Mentors record

## /api/mentors/ --> POST Request
    It's used to create mentors with the help of mentor schema.
## /api/mentors/ --> GET Request
    To get all mentors from a mentors collection.
## /api/mentors/:mentorId --> PUT Request
    To assign multiple students for a single mentor.
## /api/mentors/:mentorId --> GET Request
    To get specific mentor using mentor id.

### Please use https://assign-mentor-jr05.onrender.com as a prefix to all endpoints.
