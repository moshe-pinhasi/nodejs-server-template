import express from 'express'
import requireAuth from '../../middlewares/requireAuth.middleware'
import {getAccount, listAccounts} from './account.controller'
const router = express.Router()

// middleware that is specific to this router
router.use(requireAuth)

router.get('/', listAccounts)
router.get('/:id', getAccount)

export default router