import mongoose from 'mongoose';

console.log(process.env.DSN);
mongoose.connect(process.env.DSN);

// UserSchema that contains user info
const UserSchema = new mongoose.Schema({
    username: String,
    cart: [String],
    inventory: [String]
});

mongoose.model('users', UserSchema);

export default UserSchema;

