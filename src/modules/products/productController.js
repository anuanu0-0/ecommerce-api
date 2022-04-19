const bcrypt = require("bcryptjs");
var jwt = require("jsonwebtoken");

const productService = require("./productService");

const getUserData = (req) => {
    const token = req.header("auth-token");
    return jwt.verify(token, process.env.JWT_KEY);
}

const createProduct = async (req, res) => {
    const userData = getUserData(req);
    
    let productData = {};
    productData.title = req.body.title;
    productData.pictureUrl = req.body.pictureUrll
    productData.status = req.body.status;
    productData.price = req.body.price;
    productData.userId = userData.userId;

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
    const userData = getUserData(req);

    let data = {
        productId: req.params.productId,
        productStatus : req.body.productStatus,
        title: req.body.title,
        pictureUrl: req.body.pictureUrl,
        price: req.body.price,
        userId: userData.userId
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
    const userData = getUserData(req);

    let data = {};
    data.productStatus = req.body.productStatus;
    data.productId = req.body.productId;
    data.userId = userData.userId;

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
    const userData = getUserData(req);

    let data = {};
    data.productId = req.params.productId;
    data.userId = userData.userId;

    try {
        await productService.deleteProduct(data);
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

const buyProduct = async (req, res) => {
    const userData = getUserData(req);

    let data = {
        userId: userData.userId,
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