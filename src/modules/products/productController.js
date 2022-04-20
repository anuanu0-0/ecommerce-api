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
        await productService.createProduct(productData);
        res.status(200).json({
            success: 1,
            message: "Product created successfully"
        });
    } catch (err) {
        console.log(err.message);
        res.status(400).json({
            success: 0,
            message: err.message
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
        await productService.updateProduct(data);
        res.status(200).json({
            success: 1,
            message: "Product updated successfully"
        });
    } catch (err) {
        console.log(err.message);
        res.status(500).json({
            success: 0,
            message: err.message
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
        await productService.updateProductStatus(data);
        res.status(200).json({
            success: 1,
            message: "Product updated successfully"
        });
    } catch (err) {
        console.log(err.message);
        res.status(500).json({
            success: 0,
            message: err.message
        });
    }
}

const deleteProduct = async (req, res) => {

    let data = {};
    data.productId = req.params.productId;
    data.userId = req.userId;

    try {
        await productService.deleteProduct(data);
        res.status(200).json({
            success: 1,
            message: "Product deleted successfully"
        });
    } catch (err) {
        console.log(err.message);
        res.status(400).json({
            success: 0,
            message: err.message
        });
    }
};

const buyProduct = async (req, res) => {

    let data = {
        userId : req.userId,
        productIds: req.body.productIds
    };  

    try {   
        const totalPrice = await productService.buyProduct(data);
        res.status(200).json({
            success: 1,
            message: "Product created successfully",
            price: totalPrice
        });
    } catch (err) {
        console.log(err.message);
        res.status(400).json({
            success: 0,
            message: err.message
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