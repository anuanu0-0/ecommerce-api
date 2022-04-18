const pool = require("../../config/dbConfig");
const {OrderStatus} = require("../../helper/enums");

const updateOrderStatusByAdmin = async(data) => {
    await pool.query(`update Order set status = ? where id = ?`, [data.status, data.productId]);
}

module.exports = {
    updateOrderStatusByAdmin
}