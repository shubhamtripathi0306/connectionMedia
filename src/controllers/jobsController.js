const jobModel = require('../models/jobsModel');
const recruiterModel = require('../models/recruiterModel');

const isValid = function (value) {
    if (typeof value === "undefined" || value == null) return false;
    if (typeof value === "string" && value.trim().length === 0) return false;
    return true;
};


const jobCreation = async function (req, res) {
    try {

        let jobDetails = req.body
        let jobid = req.params.id

        if (!jobid) {
            return res.status(400).send({ status: false, message: "please provide id" });
        }

        if (Object.keys(jobDetails) == 0) {
            return res.status(400).send({ status: false, msg: "jobDetails must be provided" });
        }

        let { companyName, jobPostedBy, jobTitle, reqExp, location, offerSalary, skills, workMode, companyProf } = jobDetails

        if (!isValid(companyName)) {
            res.status(400).send({ status: false, message: 'mention the company name' })

        }

        if (!isValid(jobPostedBy)) {
            res.status(400).send({ status: false, message: 'mention the person name' })

        }

        if (!isValid(jobTitle)) {
            res.status(400).send({ status: false, message: 'jobTitle is required' })

        }

        if (!isValid(reqExp)) {
            res.status(400).send({ status: false, message: 'please fill reqExp field' })

        }

        if (!isValid(location)) {
            res.status(400).send({ status: false, message: 'location is required' })

        }


        if (!isValid(offerSalary)) {
            res.status(400).send({ status: false, message: 'mention the offerSalary' })

        }

        if (!isValid(skills)) {
            res.status(400).send({ status: false, message: 'provide skills' })
        }

        if (!isValid(workMode)) {
            res.status(400).send({ status: false, message: 'provide workMode' })
        }

        if (!isValid(companyProf)) {
            res.status(400).send({ status: false, message: 'provide companyProf' })
        }


        const check = await recruiterModel.findOne({ _id: jobid })

        if (!check) {
            return res.status(400).send({ status: false, message: "only valid recruiter could create" })
        } else {
            var newjobDetails = await jobModel.create(jobDetails)
        }
        res.status(201).send({ status: true, msg: "jobDetails created successfully", data: newjobDetails })

    } catch (err) {
        res.status(500).send({ status: false, msg: err.message })
    }
}



module.exports = { jobCreation }