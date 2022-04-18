const router = require('express').Router();

const orderController = require("./orderController");

router.patch("/:productId", orderController.updateStatus);

module.exports = router;

// TODO: Extra APIs
// router.get('/', orderController.getAllOrders);
// router.get('/:orderId', orderController.getOrderById);

