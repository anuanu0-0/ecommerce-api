const { hashSync, genSaltSync, compareSync } = require("bcrypt");
const { sign } = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
var jwt = require("jsonwebtoken");
const userService = require("./userService");
require("dotenv").config();

/**
 * Login existing user
 *
 * Example responses:
 * HTTP 200
 * {
  *     "success": 1,
        "message": "Logged in successfully",
        "token" : "bearer_token_xxxxxxxxxxxxxxx"       
 * }
 *
 *
 */
const login = async(req, res) => {

    const {email, password} = req.body;
    console.log(req.body)
    let data = {
        email : email,
        password : password
    };
    console.log(data);
    try{
        const userId = await userService.loginUser(data);
        const authToken = jwt.sign({email, userId}, process.env.JWT_KEY, {
            expiresIn:"5h"
        });
        console.log(authToken);
        res.status(200).json({
            success: 1,
            message: "Logged in successfully",
            token: authToken
        })
    } catch(err) {
        console.log(" User Controller:" + err.message);
        res.status(401).json({
            success: 0,
            message: err.message
        });
    }
}

/**
 * Register new user
 *
 * Example responses:
 * HTTP 409
 * {
 *      "success": 0,
        "message": "Email already exists"
 * }
 * 
 *
 */
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

    }
    catch(err) {
        console.log(err.message);
    }

    try {
        const userId = await userService.registerUser(user);
        const token = jwt.sign({email, userId}, process.env.JWT_KEY);
        res.status(200).json({
            success: 1,
            message: "User created successfully!",
            token
        });
    } catch(err) {
        console.log(err.message);
        res.status(409).json({
            success: 0,
            message: err.message
        });
    }
    
}

/**
 * Delete user - Admin operation
 *
 * Example responses:
 * HTTP 200
 * {    
 *      "success": 1,
        "message": "User deleted successfully!"
 * }
 *
 * HTTP 401
 * {
 *      "success": 0,
        "message": "Unauthorized access! Only admin allowed.."
 * }
 *
 */
const deleteUser = async(req, res) => {
    let data = {
        userId : req.userId,
        deleteUserId : req.params.userId
    };

    console.log(data);

    try {
        await userService.deleteUserByAdmin(data);
        res.status(200).json({
            success: 1,
            message: "User deleted successfully!"
        });
    } catch (err) {
        console.log(err.message);
        res.status(401).json({
            success: 0,
            message: err.message
        });
    }
} 

module.exports = {
    login,
    register,
    deleteUser
}