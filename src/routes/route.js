const express = require('express')
const router = express.Router()
const { createSeeker, updateSeeker } = require('../controllers/seekerController');
const { createRecruiter, login, updateRecruiter,getDetails } = require('../controllers/recruiterController')
const { jobCreation } = require('../controllers/jobsController')
const { authentication, authorisation } = require('../middleware/middleware')


router.post('/register', createSeeker);
router.put('/updateSeeker/:id', updateSeeker)


router.post('/createRecruiter', createRecruiter)
router.post('/loginRecruiter', login)
router.put('/updateRecruit/:id', authentication, authorisation, updateRecruiter)
router.get('/getSeeker/:id',authentication, authorisation,getDetails)

router.post('/createJob/:id', authentication, authorisation, jobCreation);


module.exports = router