const mongoose = require('mongoose');
//check new syntex for connect mongoose 

const mongooseUri = "mongodb://localhost:27017/?readPreference=primary&appname=MongoDB%20Compass&ssl=false";

const connectTOMongo = async ()=>{
    try {
        mongoose.set('strictQuery', false)
        mongoose.connect(mongooseUri) 
        console.log('Mongodb connected successfully ...............')
    } catch(error) {
        console.log(error)
        process.exit()
    }
}

module.exports = connectTOMongo;