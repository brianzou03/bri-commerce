import mongoose from 'mongoose';

console.log(process.env.DSN);
mongoose.connect(process.env.DSN);

// User Schema that contains user info
const UserSchema = new mongoose.Schema({
    username: String,
    hash: String,
    cart: String,
    inventory: String,
    picture: String,
    bio: String
});



/*TODO: fix picture placeholder to image:
picture: {
            data: Buffer,
            contentType: String
        },
*/

// TODO: create item schema for items?

mongoose.model('UserSchema', UserSchema);

export default UserSchema;