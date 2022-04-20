const express =  require('express');
const router = express.Router();

const {validate} = require("./../middleware/authenticate");
const productController = require("./productController");

router.post('/', validate, productController.createProduct)
router.patch('/update/:productId', validate, productController.updateProduct)
router.patch('/updateStatus/:productId', validate, productController.updateProductStatus)
router.delete('/delete/:productId', validate, productController.deleteProduct);
router.get('/buy', validate, productController.buyProduct);

// TODO: Extra APIS
// router.get('/',productController.getProducts)
// router.get('/:id',controller.getProductsById)

module.exports = router;