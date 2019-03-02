import authService from './auth.service'
import Logger from '../../services/logger.service'

export const login = async (req, res) => {
    const {email, password} = req.body
    try {
        const token = await authService.login(email, password)
        res.send({message: 'login success!', token})
    } catch(err) {
        res.status(400).send({error: err})
    }
}

export const signup = async (req, res) => {
    Logger.debug(`auth.route - signup`)

    try {
        const {email, password, username} = req.body
        const account = await authService.signup(email, password, username)
        Logger.debug(`auth.route - new acount created: ` + JSON.stringify(account))
        const token = await authService.login(email, password)
        res.send({message: 'Signup success!', token})    
    } catch(err) {
        res.status(500).send({error: err})
    }
}

export const logout = async (req, res) => {
    await authService.logout(req.token)
    res.send({message: 'logged out successfully'})
}