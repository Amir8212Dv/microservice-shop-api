import jwt from 'jsonwebtoken'

const checkAuthentication = (req , res , next) => {
    try {
        const authCode = req.headers?.authorization
        const [bearer , token] = authCode.split(' ')
        if(!bearer || !token) throw {statusCode : 403 , message : 'please login again'}

        const {email} = jwt.verify(token , process.env.JWT_SECRETE_KEY)
        if(!email) return {statusCode : 403 , message : 'please login again'}
        req.userEmail = email
        next()

    } catch (error) { 
        next(error)
    }
}

export default checkAuthentication