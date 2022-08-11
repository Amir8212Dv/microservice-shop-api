import jwt from 'jsonwebtoken'

const createAccessToken = data => jwt.sign(data , process.env.JWT_SECRETE_KEY)

export default createAccessToken