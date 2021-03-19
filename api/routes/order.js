const express =require('express');
const router =express.Router();
const CheckAuth = require('../middleware/check-auth');
const OrdersController=require('../controllers/orders')


router.get('/',CheckAuth ,OrdersController.orders_get_all);                                                    // it tells express that you need to execute this function(i.e orders_get_All) whenevr we reciev incoming request here.

router.post('/',CheckAuth,OrdersController.orders_Create_order)

router.get('/:orderId',CheckAuth,OrdersController.Find_order_ById)

router.delete('/:orderId', CheckAuth,OrdersController.Delete_Order)

module.exports = router;