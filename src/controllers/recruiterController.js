const recruiterModel = require('../models/recruiterModel');
const { isValid, isValidRequestBody } = require('../validator/validator');
// const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');
const seekersModel = require('../models/seekersModel');


const createRecruiter = async (req, res) => {
    try {
        const requestBody = req.body;

        if (!isValidRequestBody(requestBody)) {
            return res.status(400).send({ status: false, message: "Invalid request parameters. Please provide  details" })
        }
        const { name, email, password, contactNo, designation } = req.body

        if (!isValid(name)) {
            return res.status(400).send({ status: false, message: 'name of recruiter is required' })
        }

        if (!isValid(email)) {
            return res.status(400).send({ status: false, message: 'email is required' })
        }

        if (!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email))) {
            return res.status(400).send({ status: false, message: 'Email should be valid email' })
        }

        const emailAlreadyUsed = await recruiterModel.findOne({ email })
        if (emailAlreadyUsed) {
            return res.status(400).send({ status: false, message: `${email} is already registered` })
        }

        if (!isValid(password)) {
            return res.status(400).send({ status: false, message: 'password is required' })
        }

        if (!isValid(designation)) {
            return res.status(400).send({ status: false, message: 'please write designation' })
        }

        if (!isValid(contactNo)) {
            return res.status(400).send({ status: false, message: 'contactNo is required' })
        }

        if (!(/^(\+\d{1,3}[- ]?)?\d{10}$/.test(contactNo))) {
            return res.status(400).send({ status: false, message: 'contactNo number should be valid mobile number' })
        }

        const phoneAlreadyUsed = await recruiterModel.findOne({ contactNo })
        if (phoneAlreadyUsed) {
            return res.status(400).send({ status: false, message: `${contactNo} number already registered` })
        }

        const recruiterCreated = await recruiterModel.create(requestBody)
        res.status(201).send({ status: true, message: "Success", data: recruiterCreated })
    }
    catch (error) {
        return res.status(500).send({ status: false, message: error.message });
    }
}




const login = async function (req, res) {
    let data = req.body;
    let email = data.email;
    let password = data.password;

    let result = await recruiterModel.findOne({ email: email, password: password })
    if (!result) {
        return res.status(404).send({ status: false, msg: "Invalid Credentials,please Check..!!" })
    }
    // res.send(result)
    let payload = { _id: result._id };
    let token = jwt.sign(payload, "viper");
    res.setHeader("x-auth-token", token);
    res.send({ status: true, msg: "Successfully LoggedIn", tokenData: token })
}


const updateRecruiter = async function (req, res) {
    try {
        const recruiterId = req.params.id
        
        const updateData = await recruiterModel.findById({ _id: recruiterId })

        if (!updateData) {
            return res.status(404).send({ status: false, message: "No data found" })
        }

        const requestBody = req.body
        if (Object.keys(req.body) == 0) {
            return res.status(400).send({ status: false, message: 'please provide data for updation' })
        }
        
        

        const updateDetails = await recruiterModel.findOneAndUpdate({ _id: recruiterId }, { ...requestBody }, { new: true })


        return res.status(200).send({ status: true, message: "details updated successfully", data: updateDetails })
    }
    catch (err) {
        console.log(err)
        res.status(500).send({ status: false, msg: err.message })
    }
}


const getDetails = async function (req, res) {
    try {

        const findData = await seekersModel.find(req.query)
        if (findData.length === 0) {
            return res.status(404).send({ status: false, msg: "no such role found" })
        }
        return res.status(200).send({ status: true, data: findData })

    } catch (error) {
        res.status(500).send({ status: true, message: error.message })
    }
}


module.exports = { createRecruiter, login, updateRecruiter,getDetails }