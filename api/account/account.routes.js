const express = require('express')
const requireAuth = require('../../middlewares/requireAuth.middleware')
const {getAccount, getAccounts} = require('./account.controller')
const router = express.Router()

// middleware that is specific to this router
router.use(requireAuth)

router.get('/', getAccounts)
router.get('/:id', getAccount)

module.exports = router