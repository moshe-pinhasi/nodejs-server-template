const express = require('express')
const requireAuth = require('../../middlewares/requireAuth')
const router = express.Router()
const {account, accounts} = require('./account.controller')

// middleware that is specific to this router
router.use(requireAuth)

router.get('/', account)

router.get('/list', accounts)

module.exports = router