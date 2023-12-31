import mongoose from 'mongoose';

// UserSchema that contains user info
const UserSchema = new mongoose.Schema({
    username: String,
    bio: String
});

// CartSchema that contains cart info
const CartSchema = new mongoose.Schema({
    username: String,
    items: [String], 
    itemPrices: [Number]
});

// InventorySchema that contains cart info
const InventorySchema = new mongoose.Schema({
    username: String,
    items: [String], 
    itemDescriptions: [String]
});

mongoose.model('users', UserSchema);
mongoose.model('carts', CartSchema);
mongoose.model('inventories', InventorySchema);

console.log(process.env.DSN);
mongoose.connect(process.env.DSN);

export {UserSchema, CartSchema, InventorySchema,};