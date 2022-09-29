
const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId

var jobPostSchema = new mongoose.Schema({

    companyName:{
        type:String,
        required:true,
        unique:true,

    },
    jobPostedBy: {
            type: ObjectId,
            ref:"recruiter"
    },
    jobTitle: {
        type: String,
        required: true,
        trim: true
    },
    reqExp: {
        type: String
    },
    location: {
        type: String,
        required: true
    },
    offerSalary: {
        type: String,
        required: true
    },
    skills: {
        type: Array,
        required: true
    },
    workMode: {
        type: String,
        enum: ["WFO", "WFH", "HYBRID"]
    },
    companyProf: {
        type: String
    }
},
    { timestamps: true });

module.exports = mongoose.model('jobsRegister', jobPostSchema)