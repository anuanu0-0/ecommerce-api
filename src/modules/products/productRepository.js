const pool = require("../../config/dbConfig");

const productExists = async(productId) => {
    return pool.query(`select p from Product p where id = ?`, [productId]) != null;
}


module.exports = {
    productExists
}