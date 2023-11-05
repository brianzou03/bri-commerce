import mongoose from 'mongoose';

console.log(process.env.DSN);
mongoose.connect(process.env.DSN, { useNewUrlParser: true, useUnifiedTopology: true });

// User Schema that contains user info
const UserSchema = new mongoose.Schema({
    username: String,
    cart: String,
    inventory: String,
});

export default mongoose.model('User', UserSchema);
