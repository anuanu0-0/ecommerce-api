const { hashSync, genSaltSync, compareSync } = require("bcrypt");
const { sign } = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
var jwt = require("jsonwebtoken");
const userService = require("./userService");
require("dotenv").config();


const login = async(req, res) => {

    const {email, password} = req.body;
    let userData = {
        email : email,
        password : password
    };
    try {
        const response = await userService.loginUser(userData);
        console.log(response)
        const {data:userId, error}  = response || {};
        if(error) {
           throw error;
        }

        const authToken = jwt.sign({email, userId}, process.env.JWT_KEY, {
            expiresIn:"5h"
        });

        res.status(200).json({
            success: 1,
            message: "Logged in successfully",
            token: authToken
        })
    } catch(error) {
        res.status(500).json({
            success: 0,
            error: err
        });
    }
}


const register = async(req, res) => {
    const { name, email, password, role } = req.body;

    let user = {
        name, email, password, role
    }

    try {
    /***
     * const salt = await genSaltSync(10);
     * user.password = await hashSync(password, salt);
     * */    
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        user.password = hashedPassword;

    } catch(err) {
        res.status(409).json({
            success: 0,
            error: err.message
        });
    }

    try {
        const response = await userService.registerUser(user);
        const {data:userId, error} = response;
        if(error) {
            throw error;
        }
        const token = jwt.sign({email, userId}, process.env.JWT_KEY);
        res.status(200).json({
            success: 1,
            message: "User created successfully!",
            token,
        });
    } catch(err) {
        // console.log(err.message);
        res.status(409).json({
            success: 0,
            error: err
        });
    }
}

const deleteUser = async(req, res) => {
    let userData = {
        userId : req.userId,
        deleteUserId : req.params.userId
    };

    try {
        const response = await userService.deleteUserByAdmin(userData);
        const {data, error} = response;
        if(error) {
            throw error;
        }
        res.status(200).json({
            success: 1,
            error: data,
            message: "User deleted successfully!"
        });
    } catch (err) {
        console.log(err.message);
        res.status(401).json({
            success: 0,
            error: err
        });
    }
} 

module.exports = {
    login,
    register,
    deleteUser
}