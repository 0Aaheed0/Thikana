
import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email:    { type: String, required: true, unique: true },
  password: { type: String, required: true },
  profilePhoto: { type: String },  // ✅ added field
});
const User = mongoose.model("User", userSchema);


export default User;
