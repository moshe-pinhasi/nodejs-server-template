import express from 'express'
import requireAuth from '../../middlewares/requireAuth.middleware'
import {login, signup, logout} from './auth.controller'

const router = express.Router()

router.post('/login', login)
router.post('/signup', signup)
router.post('/logout', requireAuth, logout)

export default router