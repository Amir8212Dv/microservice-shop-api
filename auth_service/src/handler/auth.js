import express from 'express'
import userModel from '../model/user.js'
import createAccessToken from '../utils/createAccessToken.js'
const authRouter = express.Router()

authRouter.post('/signup' , async (req , res , next) => {
    try {
        const {name , email , password} = req.body

        const user = await userModel.create({name , email , password})

        const token = createAccessToken({email : user.email})

        res.status(201).send({
            statusCode : 201,
            message : 'user created successfully',
            data : {
                accessToken : token
            }
        })
    } catch (error) {
        next(error)
    }
})
authRouter.post('/signin' , async (req , res , next) => {
    try {
        const {email , password} = req.body

        const user = await userModel.findOne({email , password})
        if(!user) throw {statusCode : 400 , message : 'email or password is wrong'}

        const token = createAccessToken({email : user.email})

        res.status(200).send({
            statusCode : 200,
            message : 'signed in successfully',
            data : {
                accessToken : token
            }
        })
    } catch (error) {
        next(error)
    }
})

export default authRouter