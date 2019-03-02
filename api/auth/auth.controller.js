const authService = require('./auth.service')

const login = async (req, res) => {
    const token = await authService.login(
      req.body.username,
      req.body.email
    )
  
    res.send({msg: 'login success!', token})
}

const logout = async (req, res) => {
    await authService.logout(req.token)
    res.send({msg: 'logout'})
}

module.exports = {
    login,
    logout
}