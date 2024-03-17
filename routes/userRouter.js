const express =  require('express')
const router = express.Router()
const authentication = require('../controllers/authController')
//USER MANAGEMENT==============================================================================================>
router.get('/signup',authentication.getUserSignup)
router.post('/signup',authentication.postUserSignup)

module.exports = router