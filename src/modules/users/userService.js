const { compareSync } = require("bcrypt");
const pool = require("../../config/dbConfig");
const userRepository = require("./userRepository");


const loginUser = async(data) => {
    // TODO: check if user exists from userRepo
    const userExists = await userRepository.getUserByEmail(data.email);
    if(userExists == null) {
        throw new Error("Invalid user or password!");
    }

    const isPasswordEqual = compareSync(userExists.password, data.password);
    if(isPasswordEqual) {
        data.password = undefined;
        const token = sign({result: data}, process.env.JWT_KEY, {
            expiresIn:"1h"
        });
        return token;
    } else {
        throw new Error("Invalid user or password");
    }
};

const registerUser = async(user) => {
    const userExists = await userRepository.getUserByEmail(user.email);
    if (userExists != null) {
        throw new Error("Email id already taken!");
    }
    try{
        await userRepository.registerNewUser(user);
    } catch(err) {
        console.log("Register user - service: " + err.message);
        throw err;
    }
}

const deleteUserByAdmin = async(data) => {
    const isAdmin = await userRepository.roleCheckHelper(data.userId) === UserRoles.ADMIN;
    const userToBeDeletedExists = await userRepository.getUserById(data.deleteUserId) != null;

    try {
        if(!userToBeDeletedExists) {
            throw new Error("User to be deleted doesn't exists!");
        } else if (!isAdmin) {
            throw new Error("Unauthorized access! Only admin allowed..")
        } else {
            await userRepository.deleteUserById(data.deleteUserId);
        }
    } catch (err) {
        console.log(err.message);
        throw err;
    }

}

module.exports = {
    loginUser,
    registerUser,
    deleteUserByAdmin
}