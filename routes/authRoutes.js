const express = require('express')
const router = express.Router()
const authController = require('../controllers/authController')

router.get('/profiles', authController.getUser)
router.post('/signout', authController.signOut)
router.post('/sign-up',authController.signUp)
router.post('/userlogin',authController.signIn) 


module.exports = router