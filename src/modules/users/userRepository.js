const pool = require("../../config/dbConfig");

const getUserById = async (userId) => {
  return pool.query("SELECT * FROM users WHERE id= $1", [userId]);
};

const roleCheckHelper = async (userId) => {
  return pool.query("SELECT roles FROM users WHERE id= $1", [userId]);
};

const getUserByEmail = async (email) => {
  return pool.query("SELECT * FROM users WHERE email = $1", [String(email)]);
};

const getUserIdByEmail = async(email) => {
  return pool.query("SELECT id FROM users WHERE email = $1", [String(email)]);
}
const registerNewUser = async (user) => {
  const { name, email, password, role } = user;
  console.log(name, email, password, role);
  try {

    await pool.query(
      "INSERT INTO users(name,email,password,roles) VALUES($1,$2,$3,$4)",  [String(name), String(email), String(password), role]
    ) 
  } catch (err) {
    console.log(err.message);
    throw new Error("Problem inserting in database!");
  }
};

const deleteUserById = async (deleteUserId) => {
  try {
    await pool.query("DELETE FROM users WHERE id= $1", [deleteUserId]);
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
  getUserIdByEmail
};
