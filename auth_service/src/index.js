import express from 'express'
import dotenv from 'dotenv'
import authRouter from './handler/auth.js'
import { connectToMongodb } from './config/mongoose.config.js'
dotenv.config()
const app = express()

connectToMongodb()
app.use(express.json())
app.use(express.urlencoded({extended : true}))
app.use(authRouter)
app.use((req , res , next) => {
    return res.status(404).send({statusCode : 404 , message : 'page not found'})
})
app.use((error , req , res , next) => {
    const statusCode = +error.statusCode || 500
    const message = error.message || 'Internal server error'
    return res.status(statusCode).send({statusCode , message})
})

const {PORT} = process.env


app.listen(PORT , () => {
    console.log('server running on : localhost:' + PORT)
})