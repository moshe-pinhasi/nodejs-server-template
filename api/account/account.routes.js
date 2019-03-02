const express = require('express')
const requireAuth = require('../../middlewares/requireAuth.middleware')
const router = express.Router()
const {getAccount, listAccounts} = require('./account.controller')

// middleware that is specific to this router
router.use(requireAuth)

router.get('/', listAccounts)
router.get('/:id', getAccount)

module.exports = router