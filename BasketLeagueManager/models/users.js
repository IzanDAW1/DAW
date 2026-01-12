import mongoose from "mongoose";

let userSchema = new mongoose.Schema({
  login: {
    type: String,
    required: true,
    minlength: 4,
  },
  password: {
    type: String,
    required: true,
    minlength: 7,
  },
  rol: {
    type: String,
    required: true,
    enum: ["admin", "manager", "user"],
  },
});

let User = mongoose.model("users", userSchema);
export default User;
