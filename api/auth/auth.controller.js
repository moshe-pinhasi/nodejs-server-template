const authService = require('./auth.service')
const Logger = require('../../services/logger.service')
const { RequestValidationError } = require('../../models/errors')

const login = async(req, res) => {
    const errors = _validateLoginParams(req.body)
    try {
        if (errors.length > 0) {
            throw new RequestValidationError(errors)
        }
        const { email, password } = req.body
        const token = await authService.login(email, password)
        res.send({ message: 'login success!', token })
    } catch (err) {
        res.status(400).send({ error: err })
    }
}

const signup = async (req, res, next) => {
    try {
        const errors = _validateSignupParams(req.body)
        if (errors.length > 0) {
            throw new RequestValidationError(errors)
        }
        const { email, password, username } = req.body
        Logger.debug(email + ", " + username)
        const account = await authService.signup(email, password, username)
        Logger.debug(`auth.route - new account created: ` + JSON.stringify(account))
        const token = await authService.login(email, password)
        res.status(200).send({ message: 'Signup success!', token })
    } catch (err) {
        next(err)
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

// validaion examples
const _validateLoginParams = ({ email, password}) => {
    const errors = []
    
    if (!email) {
        errors.push({message: 'email is required', param: 'email'})
    } else if (!email.includes('@')) {
        errors.push({message: 'email is not valid', param: 'email'})
    }

    if (!password) {
        errors.push({message: 'password is required', param: 'password'})
    }

    return errors
}

const _validateSignupParams = ({ email, password, username}) => {
    const errors = []

    if (!email) {
        errors.push({message: 'email is required', param: 'email'})
    } else if (!email.includes('@')) {
        errors.push({message: 'email is not valid', param: 'email'})
    }

    if (!password) {
        errors.push({message: 'password is required', param: 'password'})
    } else if (password.length < 3) {
        errors.push({message: 'password should be at least 3 characters', param: 'password'})
    }

    if (!username) {
        errors.push({message: 'username is required', param: 'username'})
    }

    return errors
}

module.exports = {
    login,
    signup,
    logout,
}