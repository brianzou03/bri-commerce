import mongoose from 'mongoose';

console.log(process.env.DSN);
mongoose.connect(process.env.DSN);

// UserSchema that contains user info
const UserSchema = new mongoose.Schema({
    username: String,
    cart: [String],
    inventory: [String]
});

// CartSchema that contains cart info
const CartSchema = new mongoose.Schema({
    username: String,
    items: [String], 
    itemDescriptions: [String]
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

export {UserSchema, CartSchema, InventorySchema,};