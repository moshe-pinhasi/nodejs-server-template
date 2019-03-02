const tokenService = require('../../services/token.service');

const login = (username, email) => tokenService.sign({username, email})
const logout = (token) => Promise.resolve(true)

module.exports = {
    login,
    logout
}
