const { InternalError } = require('../models/errors')
const Logger = require('../services/logger.service')

const errorHandler = (err, req, res, next) => {
    
    let error = err
    // if (typeof err === 'object' && err.type === 'system')  skip

    // default to 500 server error
    if (typeof (err) === 'string') {
        error = new InternalError(err)
    } else if (err.type !== 'system') {
        error = new InternalError(err.message || err.stack)
    }

    Logger.error(`[ERROR-HANDLER] [${error.code}] [${error.name}] - ${error.message}`)
    res.status(error.code).json({ name: error.name, errors: error.serialize()})
}


module.exports =  errorHandler

