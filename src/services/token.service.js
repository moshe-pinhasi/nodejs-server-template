import jwt from 'jsonwebtoken'
import config from '../config'
const {secret, options} = config.jwt

const sign = (user) => new Promise((resolve, reject) => {
    jwt.sign(user, secret, options, (err, decoded) => {
        if (err) reject(err)
        else resolve(decoded)
    })
})

const verify = (token) => new Promise((resolve, reject) => {
    jwt.verify(token, secret, options, (err, token) => {
        if (err) reject(err)
        else resolve(token)
    })
})

export default {
    sign,
    verify
}
