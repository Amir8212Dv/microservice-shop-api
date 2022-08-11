import mongoose, { mongo } from "mongoose";

const productSchema = new mongoose.Schema({
    name : {type : string ,required : true},
    desc : {type : string , default : ''},
    price : {type : Number ,required : true , min : 0},
} , {
    versionKey : false
})

const productModel = mongoose.model('product' , productSchema)

export default productModel