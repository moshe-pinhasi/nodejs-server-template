const bcrypt = require('bcrypt')
const tokenService = require('../../services/token.service')
const accountService = require('../account/account.service')
const Logger = require('../../services/logger.service')

const saltRounds = 10

const login = async(email, password) => {
    Logger.debug(`auth.service - login with email: ${email}`)
    if (!email || !password) return Promise.reject(new MissigParamError('email and password are required!'))

    const account = await accountService.findByEmail(email)
    if (!account) return Promise.reject('Invalid email or password')
    const match = await bcrypt.compare(password, account.password)
    if (!match) return Promise.reject('Invalid email or password')

    return tokenService.sign({ email, username: account.username, accountId: account.id })
}

const signup = async(email, password, username) => {
    Logger.debug(`auth.service - signup with email: ${email}, username: ${username}`)
    if (!email || !password || !username) return Promise.reject('email, username and password are required!')

    const hash = await bcrypt.hash(password, saltRounds)
    return accountService.createAccount(email, hash, username)
}

const logout = (token) => Promise.resolve(true) // need to add the token to blocked list

module.exports = {
    signup,
    login,
    logout
}