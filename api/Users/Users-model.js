const db = require("../../data/dbconfig");

async function getAllUsers() {
  const Allusers = await db("users as u")
    .leftJoin("roles as r", "u.role_id", "r.role_id")
    .select("u.*", "r.role_name");
  return Allusers;
}

async function getById(user_id) {
  const Id = await db("users as u")
    .leftJoin("roles as r", "u.role_id", "r.role_id")
    .select("u.user_id", "u.username", "r.role_name")
    .where("user_id", user_id)
    .first();
  return Id;
}

async function deleteById(user_id) {
  const Id = await db("users").where("user_id", user_id).del();
  const Allusers = await db("users");
  return Allusers;
}

async function update(user_id, user) {
  const upUser = await db("users").where("user_id", user_id).update(user);
  return getById(user_id);
}

async function create(user) {
  const [newUser] = await db("users").insert(user);
  return getById(newUser);
}

async function getByFilter(filter) {
  const user = await db("users as u")
    .leftJoin("roles as r", "u.role_id", "r.role_id")
    .select("u.user_id", "u.username", "r.role_name", "u.password")
    .where(filter)
    .first();
  return user;
}

module.exports = {
  getAllUsers,
  getById,
  deleteById,
  update,
  create,
  getByFilter,
};
