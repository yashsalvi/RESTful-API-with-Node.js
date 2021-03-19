const express =require('express');
const CheckAuth = require('../middleware/check-auth');
const router =express.Router();
const multer=require("multer");
const ProductsController=require("../controllers/products")

const storage= multer.diskStorage({
    destination: function(req,file,cb){
        cb(null,'./uploads/');
    },
    filename: function(req,file,cb){
        cb(null,new Date().toISOString().replace(/:/g, '-')+ file.originalname);
        // cb(null, Date.now() + file.originalname); 
    }
})


const fileFilter=(req,res,cb)=>{
    if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/png'){
    cb(null,true);                                                         // it means u will stroe that file if it is either of the two.
    }else{
    cb(null,false);                                                              // it means u wont stroe that file
    }
}

const upload=multer({
    storage:storage,
    limits:{filesize:1024*1024*5},
    fileFlter:fileFilter
});                                                               // "/" infornt means it turns it into absolute path and try to create it in root node modules folder. So,instead we reomve it and make it relative path.


router.get('/',ProductsController.get_all_products_);

router.post('/',CheckAuth ,upload.single('productImage'),ProductsController.Create_product);


router.get('/:productId',CheckAuth ,ProductsController.get_productById );


router.patch('/:pId', CheckAuth ,ProductsController.Update_Product_byId );


router.delete('/:productId', CheckAuth,ProductsController.Delete_product);



module.exports = router;