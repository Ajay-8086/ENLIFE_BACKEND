const express =  require('express')
const router = express.Router()
const authentication = require('../controllers/authController')
//USER MANAGEMENT==============================================================================================>
router.post('/signup',authentication.postUserSignup)
router.post('/authentication',authentication.otpverify)

module.exports = router