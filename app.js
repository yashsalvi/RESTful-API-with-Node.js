const express =require('express');
const app =express();
const morgan =require('morgan')
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const productRoutes = require('./api/routes/products')
const orderRoutes = require('./api/routes/order')
const userRoutes = require('./api/routes/user')


mongoose.connect('mongodb+srv://dbUser:'+ process.env.MONGO_ATLAS_PW+'@cluster0.e81bw.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
{
    useUnifiedTopology: true
    //  useNewUrlParser: true 
}
);
mongoose.Promise=global.Promise    //default node.js promise implementation instead of mongoose one.


app.use(morgan('dev'))
app.use('/uploads',express.static('uploads'))
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json())


//CORS error are the security mechanism enforced by the browser,therefore we can overwrite it with headers. Browsers then knows IGNORE that.

app.use((req,res,next)=>{
    res.header("Access-Control-Allow-Origin","*");
    res.header(
        "Access-Control-Allow-Headers",                                //   For other methods(exceeding the put and post) only first two headers are attached. then it goes on to the routes.//
        "Origin,X-Requested-with,Content-Type,Accept,Authorization"
    );
    if(req.method === 'OPTIONS'){
        res.header('Access-Control-Allow-Methods','PUT,POST,PATCH,DELETE,GET')
                 return res.status(200).json({});
    }
    next();
})

//Routes which should handle requests
app.use('/products',productRoutes);
app.use('/orders',orderRoutes);
app.use('/user',userRoutes);
  
app.use((req,res,next)=>{
    const error =new Error('Not found');
    error.status=404;
    next(error);
})

app.use((error,req,res,next)=>{
  res.status(error.status || 500);
  res.json({
      error:{
        message: error.message
      }
  });
});



module.exports=app;