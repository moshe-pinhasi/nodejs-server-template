const express = require('express')
const requireAuth = require('../../middlewares/requireAuth')
const router = express.Router()

const {login, logout} = require('./auth.controller')

router.post('/login', login)
router.post('/logout', requireAuth, logout)

module.exports = router