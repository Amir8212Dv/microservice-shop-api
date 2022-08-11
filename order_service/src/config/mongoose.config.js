import mongoose from 'mongoose'

export const connectToMongodb = () => {
    mongoose.connect(process.env.MONGODB_URL , err => {
        if(err) return console.log('connecting to mongodb faild')
        console.log('connected to mongodb successfully')
    })
}