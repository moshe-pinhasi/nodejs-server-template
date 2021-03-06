const Logger = require('../services/logger.service')
const tokenService = require('../services/token.service')
const { UnauthorizedError } = require('../models/errors')


// In some cases we will want to split this middleware to
// tow middlewares: setCurrentUser and requireAuth for cases that we
// will need to write a route that not require authenticate
// user but if he is authenticate he will use it.
const requireAuth = async (req, res, next) => {
  const token = req.headers['authorization']
  Logger.info("[AUTH MID] path: " + req.path)

  if (!token) {
    next(new UnauthorizedError())
    return
  }

  try {
    const decoded = await tokenService.verify(token)
    Logger.debug(JSON.stringify(decoded))
    const {email, username, accountId} = decoded
    req.user = {email, username, accountId}
    next()
  } 
  catch(err) {
    Logger.debug(`[AUTH] ${err.message}`)
    next(new UnauthorizedError(err.message))
  }
}

module.exports = requireAuth
