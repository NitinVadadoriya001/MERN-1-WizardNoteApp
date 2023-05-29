//it is schema of users details 
const mongoose = require('mongoose');
const { Schema } = mongoose;

const UserSchema = new Schema({
  name:{
    type:String,
    required:true
  },
  email:{
    type:String,
    required:true,
    unique:true
    //attention when insert data about user it must be unique...
  },
  password:{
    type:String,
    required:true,
  },
  Date:{
    type:Date,
    default:Date.now
  }
});

const User = mongoose.model('user',UserSchema);
//wizardnoteapp is collection/relation name
module.exports = User;
