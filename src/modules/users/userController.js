const { hashSync, genSaltSync, compareSync } = require("bcrypt");
const { sign } = require("jsonwebtoken");

const userService = require("./userService");

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
    let data = {};
    data.email = req.body.email;
    data.password = req.body.password;

    try{
        const authToken = await userService.loginUser(data);
        res.status(200).json({
            success: 1,
            message: "Logged in successfully",
            token: authToken
        })
    } catch(err) {
        console.log(err.message);
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
    const user = req.body;
    const salt = genSaltSync(10);
    user.password = hashSync(user.password, salt);
    try {
        await userService.registerUser(user);
        res.status(200).json({
            success: 1,
            message: "User created successfully!",
            // token
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
    let data = {};
    // TODO: Get from token
    data.userId = req.body.userId;
    data.deleteUserId = req.params.deleteUserId;

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