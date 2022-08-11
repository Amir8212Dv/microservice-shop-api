import amqplib from 'amqplib'
export const connectToRabbitMq = async () => {
    try {
        const connection = await amqplib.connect(process.env.RABBITMQ_URL)
        const createChannel = await connection.createChannel()
        return createChannel
    } catch (error) {
        console.log('connecting to rabbitMQ faild')
    }
}

export const sendToQueue = async (channel , queueName , data) => {
    try {
        await (await channel).assertQueue(queueName)
        return (await channel).sendToQueue(queueName , Buffer.from(data))
    } catch (error) {
         console.log(error.message)
    }
}