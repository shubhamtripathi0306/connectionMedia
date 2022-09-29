const mongoose = require("mongoose")

const seekerSchema =  new mongoose.Schema({

        name: {
            type: String,
            required: true,
            trim: true,
        },
        email: {
            type: String,
            trim: true,
            unique: true
        },
        phone: {
            type: Number,
            trim: true,
            unique: true
        },
        skills:{
            type:Array,
            required:true
        },
        password: {
            type: String,
            trim: true
        },
        location:{
            type:String,
            required:true 
        }
},
    {timestamps: true});

module.exports = mongoose.model('seekerRegister', seekerSchema)