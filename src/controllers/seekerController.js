const seekerModel = require('../models/seekersModel');
const { isValid, isValidRequestBody } = require('../validator/validator')
// const bcrypt = require('bcrypt')




const createSeeker = async (req, res) => {
    try {
        const requestBody = req.body;

        if (!isValidRequestBody(requestBody)) {
            return res.status(400).send({ status: false, message: "Invalid request parameters. Please provide seeker's details" })
        }
        const { name, email, phone, password, location } = req.body


        if (!isValid(name)) {
            return res.status(400).send({ status: false, message: 'name is required' })
        }

        if (!isValid(phone)) {
            return res.status(400).send({ status: false, message: 'phone is required' })
        }

        if (!(/^(\+\d{1,3}[- ]?)?\d{10}$/.test(phone))) {
            return res.status(400).send({ status: false, message: 'phone number should be valid mobile number' })
        }

        const phoneAlreadyUsed = await seekerModel.findOne({ phone })
        if (phoneAlreadyUsed) {
            return res.status(400).send({ status: false, message: `${phone} number already registered` })
        }

        if (!isValid(email)) {
            return res.status(400).send({ status: false, message: 'email is required' })
        }
        if (!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email))) {
            return res.status(400).send({ status: false, message: 'Email should be valid email' })
        }

        const emailAlreadyUsed = await seekerModel.findOne({ email })
        if (emailAlreadyUsed) {
            return res.status(400).send({ status: false, message: `${email} is already registered` })
        }


        if (!isValid(password)) {
            return res.status(400).send({ status: false, message: 'password is required' })
        }

        if (!(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,15}$/.test(password))) {
            return res.status(400).send({ status: false, message: 'password should be valid password' })
        }

        if (!isValid(location)) {
            return res.status(400).send({ status: false, message: 'location is required' })
        }


        const seekerCreated = await seekerModel.create(requestBody)
        res.status(201).send({ status: true, message: "Success", data: seekerCreated })
    }
    catch (error) {
        return res.status(500).send({ status: false, message: error.message });
    }
}



const updateSeeker = async function (req, res) {
    try {
        const seekerId = req.params.id
        const requestBody = req.body


        if (Object.keys(req.body) == 0) {
            return   res.status(400).send({ status: false, message: 'please provide data for updation' })    
        }

        if (!isValidRequestBody(requestBody)) {
            return res.status(400).send({ status: false, message: "Please provide some data to update" })
        }

        const updateDetails = await seekerModel.findOneAndUpdate({ _id: seekerId },{...requestBody},{new:true})
      

        return res.status(200).send({ status: true, message: "details updated successfully", data: updateDetails})
    }
    catch (err) {
        console.log(err)
        res.status(500).send({ status: false, msg: err.message })
    }
}



module.exports = { createSeeker, updateSeeker }
