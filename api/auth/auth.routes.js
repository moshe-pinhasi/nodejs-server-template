const express = require('express')
const requireAuth = require('../../middlewares/requireAuth.middleware')
const {login, signup, logout, validateSignupParams} = require('./auth.controller')

const router = express.Router()

router.post('/login', login)
router.post('/signup', validateSignupParams, signup)
router.post('/logout', requireAuth, logout)

module.exports = router