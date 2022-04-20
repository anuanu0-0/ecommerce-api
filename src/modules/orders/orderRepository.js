const pool = require("../../config/dbConfig");
const {OrderStatus} = require("../../helper/enums");

const createOrder = async(orderData) => {
    const {orderStatus, items, totalPrice, createdBy} = orderData;

    await pool.query("INSERT INTO orders(status, items, total_price, created_by) VALUES($1,$2,$3,$4)", 
    [orderStatus, items, totalPrice, createdBy]);
}

const updateOrderStatusByAdmin = async(data) => {
    const {orderStatus, orderId} = data;
    await pool.query("UPDATE orders SET status = $1 WHERE id = $2", [orderStatus, orderId]);
}

const orderExists = async(orderId) => {
    return pool.query("SELECT o FROM orders o WHERE id = $1", [orderId]);
}

module.exports = {
    createOrder,
    updateOrderStatusByAdmin,
    orderExists
}