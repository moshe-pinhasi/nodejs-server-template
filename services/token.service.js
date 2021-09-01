const jwt = require('jsonwebtoken')
const config = require('../config')
const {secret, options} = config.jwt

const sign = (user) => new Promise((resolve, reject) => {
    jwt.sign(user, secret, options, (err, decoded) => {
        if (err) reject(err)
        else resolve(`Bearer ${decoded}`)
    })
})

const verify = (token) => new Promise((resolve, reject) => {
    // the token here should come with the prefix 'Bearer'
    jwt.verify(token.split(' ')[1], secret, options, (err, token) => {
        if (err) reject(err)
        else resolve(token)
    })
})

module.exports = {
    sign,
    verify
}
