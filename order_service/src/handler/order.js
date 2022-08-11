import express from 'express'
import productModel from '../../../product_service/src/model/product.js'
import { connectToRabbitMq , sendToQueue } from '../config/rabbitmq.config.js'
import orderModel from '../model/order.js'

const orderRouter = express.Router()
const channel = connectToRabbitMq()

export const reciveOrder = async () => {
    await (await channel).consume('ORDER' , msg => {
        if(msg.content) {
            const {product , userEmail} = JSON.parse(msg.content.toString())
            const checkForOrder = await orderModel.findOne({userEmail})
            if(checkForOrder) {
                checkForOrder.products.push(product._id)
                checkForOrder.totalPrice += +product.price
                await checkForOrder.save()
            } else {
                const order = await orderModel.create({products : [product._id] , userEmail , totalPrice : +product.price})
            }
            (await channel).ack(msg)
            sendToQueue(channel , 'PRODUCT' , {message : 'product ordered successfully'})
        }
    })
}

export default orderRouter