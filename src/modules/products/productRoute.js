const express =  require('express');
const router = express.Router();

const productController = require("./productController");

router.post('/', productController.createProduct)
router.patch('/update/:productId',productController.updateProduct)
router.patch('/updateStatus/:productId', productController.updateProductStatus)
router.delete('/delete/:productId',productController.deleteProduct);
router.get('/buy', productController.buyProduct);

// TODO: Extra APIS
// router.get('/',productController.getProducts)
// router.get('/:id',controller.getProductsById)

module.exports = router;