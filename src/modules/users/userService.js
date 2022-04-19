const { compareSync } = require("bcrypt");
const pool = require("../../config/dbConfig");
const bcrypt = require("bcryptjs");
var jwt = require("jsonwebtoken");
const {UserRoles} = require("./../../helper/enums");

const userRepository = require("./userRepository");


const loginUser = async(data) => {
    const {email, password} = data;
    try {       
        const isUserValid = await userRepository.getUserByEmail(email);
        if(isUserValid.rowsCount===0) {
            throw new Error("Invalid user or password!");
        }
        
        const isPasswordEqual = await bcrypt.compare(password, isUserValid.rows[0].password);      
        if(isPasswordEqual) {
            let userId = await userRepository.getUserIdByEmail(email);
            userId = userId.rows[0].id;
            return userId;
        } else {
            throw new Error("Invalid user or password");
        }
    } catch (err) {
        console.log("User service " + err.message);
        throw err;
    }
};

const registerUser = async(user) => {
    
    try {
        const userExists = await userRepository.getUserByEmail(user.email).rowCount;
        if (userExists) {
            throw new Error("Email id already taken!");
        }
    } catch(err) {
        console.log(err.message);
    }
    
    try{
        console.log(user);
        await userRepository.registerNewUser(user);
        let userId = await userRepository.getUserIdByEmail(user.email);
        userId = userId.rows[0].id;
        return userId;
    } catch(err) {
        console.log("Register user - service: " + err.message);
        throw err;
    }
}

const deleteUserByAdmin = async(data) => {
    try {
        const {rows} = await userRepository.roleCheckHelper(data.userId);
        const userToBeDeletedExists = await userRepository.getUserById(data.deleteUserId) != null;
        const isAdmin = rows[0].roles;

        if(!userToBeDeletedExists) {
            throw new Error("User to be deleted doesn't exists!");
        } else if (isAdmin!=UserRoles.ADMIN) {
            throw new Error("Unauthorized access! Only admin allowed..")
        } else {
            await userRepository.deleteUserById(data.deleteUserId);
        }
    } catch (err) {
        console.log("deleteUserByAdmin service" + err.message);
        throw err;
    }
}

module.exports = {
    loginUser,
    registerUser,
    deleteUserByAdmin
}