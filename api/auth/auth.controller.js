const authService = require('./auth.service')
const Logger = require('../../services/logger.service')
const { RequestValidationError, BadRequestError } = require('../../models/errors')

const login = async(req, res) => {
    const errors = _validateLoginParams(req.body)

    if (errors.length > 0) {
        throw new RequestValidationError(errors)
    }
    const { email, password } = req.body
    const token = await authService.login(email, password)
    if (!token) {
        throw new BadRequestError('Invalid email or password')
    } 

    return res.status(200).send({ message: 'login success!', token })
}

const signup = async (req, res) => {
    const errors = _validateSignupParams(req.body)
    if (errors.length > 0) {
        throw new RequestValidationError(errors)
    }    
    const { email, password, username } = req.body
    Logger.debug(`auth.route - ${email}, ${username}`)
    const account = await authService.signup(email, password, username)
    if (!account) {
        throw new BadRequestError('Invalid data')
    }

    Logger.debug(`auth.route - new account created: ` + JSON.stringify(account))
    const token = await authService.login(email, password)
    return res.status(200).send({ message: 'Signup success!', token })
}

const logout = async(req, res) => {
    await authService.logout(req.token)
    return res.status(200).send({ message: 'logged out successfully' })
}

// validaion examples
const _validateLoginParams = ({email, password}) => {
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