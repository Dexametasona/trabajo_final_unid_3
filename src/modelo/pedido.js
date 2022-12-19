import { Schema, model } from "mongoose";

const tiendaSchema=new Schema({
    sku:{
        type:String,
    },
    name:{
        type:String,
    },
    price:{
        type:Number,
    },
    unid:{
        type:Number,
        required:true,
        trim:true
    },
    total:{
        type:Number,
        default:0
    }
},
{
    timestamps:true,
    versionKey:false
})

const prodSchema=new Schema({
    name:String,
    price:Number, 
    sku:{
        type:String,

    },
    stock:Number
},
{
    timestamps:true,
    versionKey:false
})
const saleSchema= new Schema({
    total:Number,
    tipo:String
})

const registroSchema=new Schema({
    email:String,
    productos:String,
    tarjeta:String,
    tipo_pago:String,
    importe:Number
})

const registro=model('registro', registroSchema)
const mod_sale= model('compras',saleSchema);
const mod_prod= model('producto', prodSchema);
export default model("pedido", tiendaSchema)

export {mod_prod}
export {mod_sale}
export {registro}