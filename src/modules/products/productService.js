const productRepository = require("./productRepository");
const userRepository = require("./../users/userRepository");
const orderService = require('./../orders/orderService')
const {UserRoles} = require("../../helper/enums");
const {ProductStatus} = require("../../helper/enums");
const {OrderStatus} = require("../../helper/enums");

const createProduct = async(productData) => {
    // TODO: Check that the product doesnot exits

    productData.status = ProductStatus.ACTIVE;
    const {rows} = await userRepository.roleCheckHelper(productData.userId);
    const userRole = rows[0].roles;

    if(userRole == UserRoles.ADMIN || userRole == UserRoles.VENDOR) {
        await productRepository.createNewProduct(productData);
        return {
            data: null,
            error: null
        }
    } else {
        return {
            data: null,
            error: "Unauthorized access! Cannot create a new product"
        }
        // throw new Error ("Unauthorized access! Cannot create a new product");
    }
}

const updateProduct = async(productData) => {
    const {rows} = await userRepository.roleCheckHelper(productData.userId);
    const userRole = rows[0].roles;
    if(userRole == UserRoles.SHOPPER) {
        // throw new Error("Unauthorized access! Cannot update product");
        return {
            data: null,
            error: "Unauthorized access! Cannot update product"
        }
    } else if (userRole == UserRoles.VENDOR && (productData.productStatus == ProductStatus.ACTIVE 
        || productData.productStatus == ProductStatus.INACTIVE)) {
            // throw new Error ("Unauthorized access! Cannot update product");
            return {
                data: null,
                error: "Unauthorized access! Cannot update product"
            }
    } else {
        await productRepository.updateProductById(productData);
        return {
            data: null,
            error: null
        }
    }
}

const updateProductStatus = async(data) => {
    const {userId, productId, productStatus} = data;
    
    const isValidProduct = productRepository.productExists(productId);
    if(!isValidProduct) {
        return {
            data: null,
            error: "Product doesn't exists!"
        }
        // throw new Error("Product doesn't exists!");
    } 

    const {rows} = await userRepository.roleCheckHelper(userId);
    const userRole = rows[0].roles;

    if(userRole==UserRoles.VENDOR && productStatus==ProductStatus.READY_FOR_LISTING) {
        await productRepository.updateProductStatus(productStatus, productId);
        return {
            data: null,
            error: null
        }
    } else if (userRole==UserRoles.ADMIN && (productStatus==ProductStatus.READY_FOR_LISTING ||
                 productStatus==ProductStatus.ACTIVE || productStatus==ProductStatus.INACTIVE)) {
        await productRepository.updateProductStatus(productStatus, productId);
        return {
            data: null,
            error: null
        }
    } else if(userRole==UserRoles.SHOPPER){
        // throw new Error ("Unauthorized access! Cannot update product...");
        return {
            data: null,
            error: "Unauthorized access! Cannot update product..."
        }
    } else {
        return {
            data: null,
            error: "Invalid Product status!!"
        }
        // throw new Error ("Invalid Product status!!");
    }

}

const deleteProduct = async(data) => {
    const {userId, productId} = data;
    const {rows} = await userRepository.roleCheckHelper(userId);
    const userRole = rows[0].roles;
    if(userRole == UserRoles.ADMIN) {
        await productRepository.deleteProductById(productId);
        return {
            data: null,
            error: null
        }
    } else {
        return {
            data: null,
            error: "Unauthorized access! Cannot delete product.."
        }
        // throw new Error ("Unauthorized access! Cannot delete product..");
    }
}

const buyProduct = async(data) => {
    const {productIds, userId} = data;

    let totalPrice = 0;
    for(const id of productIds) {
        const {rows} = await productRepository.getProductPriceForGivenId(id);
        const price = rows[0].price;
        totalPrice += price;
    }
    console.log(totalPrice);
    let orderData = {
        orderStatus: OrderStatus.ACTIVE,
        items: productIds,
        totalPrice,
        createdBy: userId
    }
    
    console.log(orderData);
    // Call orderService to create new order
    try {
        const response = await orderService.createNewOrder(orderData);
        const {error} = response;
        if(error) {
            return {
                data: null,
                error: error.message
            }
        }
        // return totalPrice;
        return {
            data: totalPrice,
            error: null
        }
    } catch(err) {
        console.log(err.message);
        // throw err;
        return {
            data: null,
            error: err.message
        }
    }
}

module.exports = {
    createProduct, 
    updateProduct,
    updateProductStatus,
    deleteProduct,
    buyProduct
}