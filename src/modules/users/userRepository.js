const pool = require("../../config/dbConfig");

const getUserById = async(userId) => {
    return pool.query(`select u from User u where id = ?`, [userId]);
}

const roleCheckHelper = async(userId) => {
    return pool.query(`select roles from User where id = ?`, [userId]);
}

const getUserByEmail = async(email) => {
    return pool.query(`select * from User where email = ?`, [email]);
}

const registerNewUser = async(user) => {
    try {
        await pool.query(`insert into User (id, name, email, password, role) values(?,?,?,?,?)`
        [
            Math.floor(Math.random() * 100000000007),
            user.name,
            user.email,
            user.password,
            user.role
        ])
    } catch (err) {
        throw new Error ("Problem inserting in database!");
    }
}

const deleteUserById = async(deleteUserId) => {
    try {
        await pool.query(`delete from User where id = ?`, [deleteUserId]);
    } catch (err) {
        throw new Error ("Database Error! Problem deleting given user...")
    }
    
}

module.exports = {
    getUserById,
    roleCheckHelper,
    getUserByEmail,
    registerNewUser,
    deleteUserById
}