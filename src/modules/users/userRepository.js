const pool = require("../../config/dbConfig");


const roleCheckHelper = async(userId) => {
    return pool.query(`select roles from User where id = ?`, [userId]);
}

module.exports = {
    roleCheckHelper
}