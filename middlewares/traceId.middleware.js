const cls = require('cls-hooked')
const uuidv4 = require('uuid/v4')

const clsNamespace = cls.createNamespace('app')

const clsMiddleware = (req, res, next) => {
    // req and res are event emitters. We want to access CLS context inside of their event callbacks
    clsNamespace.bind(req)
    clsNamespace.bind(res)

    const traceID = uuidv4()

    clsNamespace.run(() => {
        clsNamespace.set('traceID', traceID)

        next()
    })
}

module.exports = clsMiddleware