const express = require('express')
const requireAuth = require('../../middlewares/requireAuth.middleware')
const router = express.Router()

const {login, signup, logout} = require('./auth.controller')

router.post('/login', login)
router.post('/signup', signup)
router.post('/logout', requireAuth, logout)

module.exports = router