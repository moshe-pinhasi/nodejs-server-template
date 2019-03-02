import bcrypt from 'bcrypt'
import tokenService from '../../services/token.service'
import accountService from '../account/account.service'
import Logger from '../../services/logger.service'

const saltRounds = 10

const login = async (email, password) => {
    Logger.debug(`auth.service - login with email: ${email}, password: ${password}`)
    if (!email || !password) return Promise.reject('email and password are required!')

    const account = await accountService.findByEmail(email)
    if (!account) return Promise.reject('Invalid email or password - email')
    const match = await bcrypt.compare(password, account.password)
    if (!match) return Promise.reject('Invalid email or password - password')

    return tokenService.sign({email, password: account.password})
}

const signup = async (email, password, username) => {
    Logger.debug(`auth.service - signup with email: ${email}, password: ${password}, username: ${username}`)
    if (!email || !password || !username) return Promise.reject('email, username and password are required!')
    
    const hash = await bcrypt.hash(password, saltRounds)
    return accountService.createAccount(email, hash, username)
}

const logout = (token) => Promise.resolve(true) // need to add the token to blocked list

export default {
    signup,
    login,
    logout
}
