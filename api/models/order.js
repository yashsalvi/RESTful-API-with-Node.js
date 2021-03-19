const mongoose =require('mongoose');

const orderSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,                         // because we store the id of the product related to the order.
  product:{ type: mongoose.Schema.Types.ObjectId,ref:'Product',required:true},
   //connecting the schema here with the product. Ref is an imp keyword use to configure the type.
   quantity:{type:Number,default:1}
})


module.exports=mongoose.model('Order',orderSchema)