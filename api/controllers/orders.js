const Order = require('../models/order');
const Product = require('../models/product');
const mongoose =require('mongoose');

exports.orders_get_all= (req,res,next) =>{
    Order.find()
    .select('_id quantity product')
    .populate('product','name')
    .exec()
    .then(results=>{
        res.status(200).json({
          count:results.length,
          orders:results.map(result=>{
              return{
                  _id:result._id,
                  product:result.product,
                  quantity:result.quantity,
                  request:{
                      type:"GET",
                      url:"http://localhost:3000/orders/"+ result._id
                  }
              }
          }),
             
         });

    })
    .catch(err=>{
        res.status(500).json({error: err})
    })
         
}

exports.orders_Create_order =(req,res,next) =>{
    Product.findById(req.body.productId)
    .then(product=>{
        if(!product){                                                 
            return res.status(404).json({                            
            message:"Product not found"
            })
        }
        const order =new Order({
            _id:new mongoose.Types.ObjectId(),
            product:req.body.productId,
            quantity:req.body.quantity,
        });
       return order.save() 
    })
    .then(result=>{
        res.status(201).json({
            message:'Order stored',
            createdOrder:{
                _id: result._id,
                product:result.product,
                quantity:result.quantity
            },
            request:{
                type:"POST",
                url:"http://localhost:3000/orders/"+ result._id
            }
        })
    }).catch(err=>{
        console.log(err)
        res.status(500).json({error:err})
    })
        
}


exports.Find_order_ById  =(req,res,next) =>{
    Order.findById(req.params.orderId)     
    .populate('product')                                                                         
    .exec()
    .then(order=>{
        if(!order){
        return res.status(404).json({message:"Order not found"})
        }
        res.status(200).json({
             order:order,
             request:{
                type:"GET",
                url:"http://localhost:3000/orders"
             }
        })
    }).catch(err=>{
        res.status(500).json({error:err})
    })
    
        
}


exports.Delete_Order =(req,res,next) =>{
    Order.remove({id:req.params.orderId}).exec()
    .then(result=>{
       res.status(500).json({
           request:{
               type:"POST",
               url:"http://localhost:3000/orders"
           },
           message:"Order deleted successfully!"})
          }   )
    .catch(err=>{
       res.status(500).json({
           error:err
       });
    })

}
