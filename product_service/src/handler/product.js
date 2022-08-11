import express from 'express'
import sendToQueue, { connectToRabbitMq } from '../config/rabbitmq.config.js'
import checkAuthentication from '../middleware/checkAuthentication.js'
import productModel from '../model/product.js'
const productRouter = express.Router()

const channel = connectToRabbitMq()

productRouter.post('/create' , checkAuthentication , async (req , res , next) => {
    try {
        const {name , desc , price} = req.body

        const product = await productModel.create({name , desc , price})

        res.status(201).send({
            statusCode : 201,
            message : 'prudct created successfully',
            data : {
                product
            }
        })

    } catch (error) {
        next(error)
    }
})
productRouter.post('/buy' , checkAuthentication , async (req , res , next) => {
    try {
        const {productId} = req.params

        const product = await productModel.findById(productId)
        if(!product) throw {statusCode : 404 , message : 'product not found'}

        await sendToQueue(channel , 'ORDER' , {product , userEmail : req.userEmail})

        await channel.consume('PRODUCT' , msg => {
            if(msg.content) {
                res.status(200).send({
                    statusCode : 200,
                    message : JSON.parse(msg.content.toString()).message,
                    data : {}
                })
            }
        })


    } catch (error) {
        next(error)
    }
})

export default productRouter