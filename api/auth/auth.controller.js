const authService = require('./auth.service')
const Logger = require('../../services/logger.service')
const { RequestValidation } = require('../../models/errors')

const login = async(req, res) => {
    const { email, password } = req.body
    try {
        const token = await authService.login(email, password)
        res.send({ message: 'login success!', token })
    } catch (err) {
        res.status(400).send({ error: err })
    }
}

const signup = async(req, res, next) => {
    try {
        const { email, password, username } = req.body

        Logger.debug(email + ", " + username)
        const account = await authService.signup(email, password, username)
        Logger.debug(`auth.route - new account created: ` + JSON.stringify(account))
        const token = await authService.login(email, password)
        res.status(200).send({ message: 'Signup success!', token })
    } catch (err) {
        next('could not signup, please try later')
    }
}

const logout = async(req, res) => {
    try {
        await authService.logout(req.token)
        res.send({ message: 'logged out successfully' })
    } catch (err) {
        res.status(500).send({ error: err })
    }
}

// example
const validateSignupParams = (req, res, next) => {
    const { email, password} = req.body
    const errors = []
    if (!email) {
        errors.push({message: 'email is required', param: 'email'})
    } else if (!email.includes('@')) {
        errors.push({message: 'email is not valid', param: 'email'})
    }

    if (!password) {
        errors.push({message: 'password is required', param: 'password'})
    }

    errors.length > 0 ? next(new RequestValidation(errors)) : next()
}

module.exports = {
    login,
    signup,
    logout,
    validateSignupParams
}