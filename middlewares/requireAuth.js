const Logger = require('../services/logger')
const tokenService = require('../services/token.service')

module.exports = async (req, res, next) => {
  const token = req.headers['authorization']
  Logger.info("[AUTH MID] path: " + req.path)

  if (!token) {
    next({name: "UnauthorizedError"})
    return
  }

  try {
    const decoded = await tokenService.verify(token)
    Logger.info(JSON.stringify(decoded))
    const {username, email, name} = decoded
    req.user = {username, email, name}
    req.token = token
    next()
  } 
  catch(err) {
    Logger.debug(`[AUTH] ${err.message}`)
    next(err)
  }
};
