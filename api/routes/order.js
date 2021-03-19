const express =require('express');
const router =express.Router();
const CheckAuth = require('../middleware/check-auth');
const OrdersController=require('../controllers/orders')


router.get('/',CheckAuth ,OrdersController.orders_get_all);       

router.post('/',CheckAuth,OrdersController.orders_Create_order)

router.get('/:orderId',CheckAuth,OrdersController.Find_order_ById)

router.delete('/:orderId', CheckAuth,OrdersController.Delete_Order)

module.exports = router;
