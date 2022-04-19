const pool = require("../../config/dbConfig");
const { ProductStatus } = require("../../helper/enums");

const productExists = async(productId) => {
    return pool.query(`select p from Product p where id = ?`, [productId]) != null;
}

const createNewProduct = (product) => {
    const {title, pictureUrl, status, price, userId} = product;
    const randomId = Math.floor(Math.random() * 100000000007);

    await pool.query(
        `insert into Product (id, status, title, picture_url, price, created_by) values(?,?,?,?,?,?)`,
        [
          randomId,
          status,
          title,
          pictureUrl,
          price,
          userId,
        ]
      );
}

const deleteProductById = async(productId) => {
    await pool.query(`delete from Product where id = ?`, [productId]);
}

const updateProductStatus = async(productStatus, productId) => {
    await pool.query(`update Product set status = ? where id = ?`, [productStatus, productId]);
}

const updateProductById = async(product) => {
    const {productId, productStatus, title, pictureUrl, price, userId:createdBy} = product;

    await pool.query(`update Product set status = ?, title = ?, picture_url = ?, price = ?, created_by where id = ?`, 
    [productStatus, title, pictureUrl, price, createdBy, productId]);
}

const getProductPriceForGivenId = async(productId) => {
    return pool.query(`select price from Product where id = ?`, [productId]);
}

module.exports = {
    productExists,
    createNewProduct,
    deleteProductById,
    updateProductStatus,
    updateProductById,
    getProductPriceForGivenId
}