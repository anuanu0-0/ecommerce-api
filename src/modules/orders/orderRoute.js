const router = require('express').Router();
const {validate} = require("./../middleware/authenticate");
const orderController = require("./orderController");

router.patch("/update/:orderId", validate, orderController.updateStatus);

module.exports = router;

// TODO: Extra APIs
// router.get('/', orderController.getAllOrders);
// router.get('/:orderId', orderController.getOrderById);

