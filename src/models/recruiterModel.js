const mongoose = require("mongoose");



const recruiterSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        unique:true
    },
    password: {
        type: String,
        required: true
    },
    designation:{
        type:String,
        required:true
    },
    contactNo: {
        type: Number,
        required: true,
        unique:true
    },

});

module.exports = mongoose.model("recruiter", recruiterSchema);
