// https://habr.com/en/post/442392/

const cls = require('cls-hooked')
const uuidv4 = require('uuid/v4')

const clsNamespace = cls.createNamespace('app')

const clsMiddleware = (req, res, next) => {
    // req and res are event emitters. We want to access CLS context inside of their event callbacks
    clsNamespace.bind(req)
    clsNamespace.bind(res)

    console.log('[traceId] generating...');
    const traceId = uuidv4()

    clsNamespace.run(() => {
        clsNamespace.set('traceId', traceId)
        console.log('[traceId] continue');

        next()
    })
}

module.exports = clsMiddleware