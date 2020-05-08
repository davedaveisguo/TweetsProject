const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: { type: String, required: true },
  username: { type: String, required: true },
  location: String,
  bio: String,
  avatarUrl: { type: String, default: "/img/webdxd.png" },
});

const Users = mongoose.model("Users", userSchema, "users");

module.exports = Users;
