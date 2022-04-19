const jwt = require("jsonwebtoken");
require('dotenv').config()

/**
const validate = (req, res, next) => {
    let token = req.get("authorization");
    if (token) {
        token = token.slice(7);
        jwt.verify(token, process.env.JWT_KEY, (err, decoded) => {
            if (err) {
                return res.json({
                    success: 0,
                    message: "Invalid Token..."
                });
            } else {
                req.decoded = decoded;
                next();
            }
        })
    } else {
        return res.json({
            success: 0,
            message: "Access Denied! Unauthorized User"
        });
    }
}
**/


const validate = (req, res, next) => {
    const token = req.header('auth-token');
    if(token) {
        try {
            const data = jwt.verify(token, process.env.JWT_KEY);
            req.userId = data.userId;
            console.log(data + " " + data.userId);
            next();
        } catch (err) {
            res.status(401).json({
                success: 0,
                message: "Invalid email id or password!"
            })
        }
    } else {
        res.status(401).json({
            success: 0,
            message: "Invalid email or password!"
        });
    }
}

module.exports = {
    validate
}