const authService = require('./auth.service')
const Logger = require('../../services/logger.service')

const login = async (req, res) => {
    const {email, password} = req.body
    try {
        const token = await authService.login(email, password)
        res.send({message: 'login success!', token})
    } catch(err) {
        res.status(400).send({error: err})
    }
}

const signup = async (req, res) => {
    try {
        const {email, password, username} = req.body

        Logger.debug(email + ", "+ password + ", " + username)
        const account = await authService.signup(email, password, username)
        Logger.debug(`auth.route - new account created: ` + JSON.stringify(account))
        const token = await authService.login(email, password)
        res.status(200).send({message: 'Signup success!', token})    
    } catch(err) {
        Logger.error('[SIGNUP] ' + err)
        res.status(500).send({error: 'could not signup, please try later'})
    }
}

const logout = async (req, res) => {
    try {
        await authService.logout(req.token)
        res.send({message: 'logged out successfully'})
    }
    catch(err) {
        res.status(500).send({error: err})
    }
}

module.exports = {
    login,
    signup,
    logout
}