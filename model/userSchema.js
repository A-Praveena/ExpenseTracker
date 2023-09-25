const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({

    firstname : {
        type :String,
        required: true,
        trim : true,
        max : 30,
        
    },

    lastname : {
        type:String,
        required:true,
        trim:true,
        max:10,
    },

    username : {
        type:String,
        required: true,
        trim:true,
        max:30,
        unique: true,
        lowercase: true
    },

    password :{
        type:String,
        required:true,
        trim:true,
        max:20,
    },

    email : {
        type:String,
        required:true,
        trim:true,
        max:20
    },

    phone:{
        type:String,
        required: true,
        trim:true,
        max:20
    }
})

const User = mongoose.model('Users',userSchema)

module.exports = User