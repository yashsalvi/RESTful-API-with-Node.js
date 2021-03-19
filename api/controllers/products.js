const mongoose =require('mongoose');

const Product = require('../models/product');

exports.get_all_products_= (req,res,next)=>{ 
    Product.find()
    .select('name price _id productImage')
    .exec()
    .then(results=>{
        const response ={ 
            count:results.length,
            products:results.map(a_result=>{                
                return{
                    name:a_result.name,
                    price:a_result.price,
                    productImage:a_result.productImage,
                    _id:a_result._id,
                    request:{
                    type:'GET',
                    url:'http://localhost:3000/products/'+ a_result._id
                    }
                }
            })
        }
       
        res.status(200).json(response);
        
    })
    .catch(err=>{
        console.log(err);
        res.status(500).json({
        error:err
        })
    });
    
    }

    exports.Create_product =(req,res,next)=>{ 
        // console.log(req.file);
        const product =new Product({
            _id:new mongoose.Types.ObjectId(),
            name:req.body.name,
            price:req.body.price,
            productImage:req.file.path
        })
        product.save().then(result=>{ 
              res.status(201).json({ 
                message:'Created product successfully',
                createdProduct:{
                    name:result.name,
                    price:result.price,
                    _id:result._id,
                    request:{
                    type:'GET',
                    url:"http://localhost:3000/products/" + result._id
                   }
            }
            });
        
        })
        .catch(err=>{ 
        console.log(err)
        res.status(500).json({error:err})
    
    });
    }

    exports.get_productById =(req,res,next)=>{ 
        const id =req.params.productId;
        Product.findById(id)
        .select('name price _id productImage')
        .exec()
        .then(doc =>{
            console.log("From database:",doc);
            if(doc)
           {
                res.status(200).json({
                  success:{  
                    product:doc,
                    request:{
                    type:'GET',
                    // url:"http://localhost:3000/products/" + doc.id
                    }
                }
                });
        
             } else{
                 res.status(404).json({message:"No valid entry found by the provided ID"})
             }
        })
        .catch(err=>{
            console.log(err);
            res.status(500).json({error:err})
        })
    }


 exports.Update_Product_byId =(req,res,next)=>{ 
    const id =req.params.pId;
    const updateOps={}                                
    for(const ops of req.body){                   
        updateOps[ops.propName]=ops.value;                                      
    }
     Product.updateOne({_id: id},{$set:updateOps}).exec().                    
     then(result=>{
  
     res.status(200).json({
         message:"The product is updated successfully!",
         request:{
            type:'GET',
            url:"http://localhost:3000/products/" + id
         }
        })
     }).
     catch(err=>{
         console.log(err)
         res.status(404).json({error:err})
     })
}


exports.Delete_product=(req,res,next)=>{ 
    const id =req.params.productId;
   Product.remove({_id:id})
   .exec()
   .then(result=>{
       console.log(result)
       res.status(200).json({
           message:"The product deleted successfully!",
           request:{
               type:'POST',
               url:'http://localhost:3000/products',
               body:{name:'STRING',pice:"Number"},
           }
       })
   })
   .catch(err=>{
       console.log(err);
       res.status(500).json({error:err})
   })
}

