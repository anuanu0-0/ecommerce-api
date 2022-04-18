const pool = require("../../config/dbConfig");
const {UserRoles} = require("../../helper/enums");
const orderRepository = require("./orderRepository");
const productRepository = require("./../products/productRepository")
const userRepository = require("./../users/userRepository")

const updateOrderStatus = async(data) => {
    const {productId, userId} = data;
    const isAdmin = await userRepository.roleCheckHelper(userId) === UserRoles.ADMIN;
    const doesProductExists = await productRepository.productExists(productId);
 
    if(isAdmin && doesProductExists) {
        await orderRepository.updateOrderStatusByAdmin(data);
    } else {
        throw new Error("Unauthorized user!")
    }
}

module.exports = {
    updateOrderStatus
}