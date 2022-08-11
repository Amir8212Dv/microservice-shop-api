import amqplib from 'amqplib'
let channel
const connectToRabbitMq = async () => {
    try {
        const connection = await amqplib.connect(process.env.RABBITMQ_URL)
        const createChannel = await connection.createChannel()
        channel = createChannel
        return createChannel
    } catch (error) {
        console.log('connecting to rabbitMQ faild')
    }
}

connectToRabbitMq()

const sendToQueue = async (queueName , data) => {
    try {
        await channel.assertQueue(queueName)
        return channel.sendToQueue(queueName , Buffer.from(data))
    } catch (error) {
         console.log(error.message)
    }
}

export default sendToQueue