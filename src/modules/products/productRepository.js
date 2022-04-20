const pool = require("../../config/dbConfig");
const { ProductStatus } = require("../../helper/enums");

const productExists = async(productId) => {
    return pool.query("SELECT p FROM products p WHERE id = $1", [productId]) != null;
}

const createNewProduct = async(product) => {
    const {title, pictureUrl, status, price, userId} = product;

    await pool.query(
        "INSERT INTO products (status, title, picture_url, price, created_by) VALUES($1,$2,$3,$4,$5)",
        [
          status,
          title,
          pictureUrl,
          price,
          userId,
        ]
      );
}

const deleteProductById = async(productId) => {
    await pool.query("DELETE FROM products WHERE id = $1", [productId]);
}

const updateProductStatus = async(productStatus, productId) => {
    await pool.query("UPDATE products SET status = $1 where id = $2", [productStatus, productId]);
}

const updateProductById = async(product) => {
    const {productId, productStatus, title, pictureUrl, price, userId:createdBy} = product;

    await pool.query("UPDATE products SET status = $1, title = $2, picture_url = $3, price = $4, created_by = $5 where id = $6", 
    [productStatus, title, pictureUrl, price, createdBy, productId]);
}

const getProductPriceForGivenId = async(productId) => {
    return pool.query("SELECT price FROM products WHERE id = $1", [productId]);
}

module.exports = {
    productExists,
    createNewProduct,
    deleteProductById,
    updateProductStatus,
    updateProductById,
    getProductPriceForGivenId
}