import mongoose from 'mongoose'

const orderSchema = new mongoose.Schema({
    products : {type : [mongoose.Types.ObjectId] , default : []},
    userEmail : {type : String , required : true , unique : true},
    totalPrice : {type : Number , default : 0 , min : 0}
})

const orderModel = mongoose.model('order' , orderSchema)

export default orderModel