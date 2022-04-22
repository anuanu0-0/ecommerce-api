const bcrypt = require("bcryptjs");
var jwt = require("jsonwebtoken");

const productService = require("./productService");

const createProduct = async (req, res) => {
    let productData = {};
    productData.title = req.body.title;
    productData.pictureUrl = req.body.pictureUrl
    productData.price = req.body.price;
    productData.userId = req.userId;

    try {
        const response = await productService.createProduct(productData);
        const {error} = response;
        if(error) {
            throw error;
        }
        res.status(200).json({
            success: 1,
            message: "Product created successfully"
        });
    } catch (err) {
        console.log(err.message);
        res.status(400).json({
            success: 0,
            error: err
        });
    }

};

const updateProduct = async (req, res) => {

    // TODO: Improvements -> If only one field is passed, get the other fields from the db
    // and run the query for whole

    let data = {
        productId: req.params.productId,
        productStatus : req.body.status,
        title: req.body.title,
        pictureUrl: req.body.pictureUrl,
        price: req.body.price,
        userId : req.userId
    };

    try {
        const resposne = await productService.updateProduct(data);
        const {error} = resposne;
        if(error) {
            throw error;
        }
        res.status(200).json({
            success: 1,
            message: "Product updated successfully"
        });
    } catch (err) {
        console.log(err.message);
        res.status(500).json({
            success: 0,
            error: err
        });
    }
};

const updateProductStatus = async (req, res) => {

    let data = {};
    data.productStatus = req.body.status;
    data.productId = req.params.productId;
    data.userId = req.userId;

    console.log(data)

    try {
        const response = await productService.updateProductStatus(data);
        const {error} = response;
        if(error) {
            throw error;
        }
        res.status(200).json({
            success: 1,
            message: "Product updated successfully"
        });
    } catch (err) {
        console.log(err.message);
        res.status(500).json({
            success: 0,
            error: err
        });
    }
}

const deleteProduct = async (req, res) => {

    let data = {};
    data.productId = req.params.productId;
    data.userId = req.userId;

    try {
        const {error} = await productService.deleteProduct(data);
        if(error) {
            throw error;
        }
        res.status(200).json({
            success: 1,
            message: "Product deleted successfully"
        });
    } catch (err) {
        console.log(err.message);
        res.status(400).json({
            success: 0,
            error: err
        });
    }
};

const buyProduct = async (req, res) => {
    let orderData = {
        userId : req.userId,
        productIds: req.body.productIds
    };  

    try {   
        const response = await productService.buyProduct(orderData);
        const {data:totalPrice, error} = response;
        if(error) {
            throw error;
        }
        
        res.status(200).json({
            success: 1,
            message: "Order created successfully",
            price: totalPrice
        });
    } catch (err) {
        console.log(err.message);
        res.status(400).json({
            success: 0,
            error: err
        });
    }
};

module.exports= {
    createProduct, 
    updateProduct,
    updateProductStatus,
    deleteProduct,
    buyProduct
}