const Logger = require('../services/logger')

const errorHandler = (err, req, res, next) => {
    if (typeof (err) === 'string') {
        Logger.error('[ERROR-HANDLER] ' + err)
        // custom application error
        return res.status(400).json({ message: err });
    }

    if (err.name === 'UnauthorizedError') {
        Logger.error('[ERROR-HANDLER] ' + err.name)

        // jwt authentication error
        return res.status(401).json({ message: 'Invalid Token' });
    }

    Logger.error('[ERROR-HANDLER] ' + err.message)
    // default to 500 server error
    return res.status(500).json({ message: err.message });
}


module.exports = errorHandler;

