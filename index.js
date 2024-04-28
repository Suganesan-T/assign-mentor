//import the mongoose module
const mongoose = require('mongoose');

//import the config module
const config = require('./utils/config');

//import the app module
const app = require('./app');


console.log('Connecting to MongoDB...');

//connect to MongoDB using mongoose
mongoose.connect(config.MONGODB_URI)
    .then(() => {
        console.log('Connected to MongoDB');
        app.listen(config.PORT, () => {
            console.log(`Server running on port ${config.PORT}`);
        });
    })
    .catch((error) => {
        console.error('Error connecting to MongoDB:', error.message);
    });

