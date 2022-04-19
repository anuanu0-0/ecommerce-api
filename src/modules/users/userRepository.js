const pool = require("../../config/dbConfig");

const getUserById = async (userId) => {
  return pool.query(`select u from users u where id = ?`, [userId]);
};

const roleCheckHelper = async (userId) => {
  return pool.query(`SELECT roles from users where id = ?`, [userId]);
};

const getUserByEmail = async (email) => {
  return pool.query(`SELECT * FROM users WHERE email = ?`, [String(email)]);
};

const registerNewUser = async (user) => {
  const { name, email, password, role } = user;
  console.log(name, email, password, role);
  try {

    await pool.query(
      "INSERT INTO users(name,email,password,roles) VALUES($1,$2,$3,$4)",  [String(name), String(email), String(password), String(role)]
    ) 
  } catch (err) {
    console.log(err.message);
    throw new Error("Problem inserting in database!");
  }
};

const deleteUserById = async (deleteUserId) => {
  try {
    await pool.query(`delete from users where id = ?`, [deleteUserId]);
  } catch (err) {
    throw new Error("Database Error! Problem deleting given user...");
  }
};

module.exports = {
  getUserById,
  roleCheckHelper,
  getUserByEmail,
  registerNewUser,
  deleteUserById,
};
