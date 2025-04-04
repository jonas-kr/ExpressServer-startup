const JWT = require('jsonwebtoken')

export const createToken = (id) => {
    return JWT.sign({ id }, process.env.SECRET_PHRASE)
}