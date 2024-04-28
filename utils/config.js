//import dotenv package
require('dotenv').config();

//create all necessary configuration variables 
const PORT = process.env.PORT
const MONGODB_URI = process.env.MONGODB_URI

//export all configuration variables
module.exports = {
    MONGODB_URI,
    PORT
}