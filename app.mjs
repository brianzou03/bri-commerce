import './config.mjs';
import './db.mjs';
import express from 'express';
import methodOverride from 'method-override';
import mongoose from 'mongoose';
import helmet from 'helmet'; // Security middleware
import xss from 'xss-clean'; // To clean user input
import rateLimit from 'express-rate-limit'; // Rate limiter

const app = express();

app.use(helmet()); // Helmet JS for security
app.use(xss()); // XSS for security

// rate limit IP
app.use(rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100 // limit each IP to 100 requests per windowMs
}));

// Schemas
const UserSchema = mongoose.model('users');
const CartSchema = mongoose.model('carts');
const InventorySchema = mongoose.model('inventories');

import url from 'url';
import path from 'path';
const __dirname = path.dirname(url.fileURLToPath(import.meta.url));
app.use(express.static(path.join(__dirname, 'public')));

// configure templating to hbs
app.set('view engine', 'hbs');

// body parser (req.body)
app.use(express.urlencoded({ extended: false }));

// Use method-override middleware to handle the DELETE request
app.use(methodOverride('_method'));

// Adding a simple logging function
function logData(message, data) {
    console.log(message, JSON.stringify(data, null, 2));
}

// route handler for GET to home.hbs
app.get('/', (req, res) => {
    UserSchema.find()
        .then((users) => {
            logData('Users found: ', users); // Log found users
            res.render('home', { users });
        })
        .catch((err) => {
            logData('Error finding users: ', err); // Log errors
            res.status(500).send('Internal server error');
        });
});

// route handler for cart page
app.get('/cart_page', (req, res) => {
    CartSchema.find()
        .then((carts) => {
            logData('Cart found: ', carts); // Log found carts
            res.render('cart_page', { carts });
        })
        .catch((err) => {
            logData('Error finding carts: ', err); // Log errors
            res.status(500).send('Internal server error');
        });
});

//route handler for inventory page
app.get('/inventory_page', (req, res) => {
    InventorySchema.find()
        .then((inventories) => {
            logData('Inventory found: ', inventories); // Log found inventories
            res.render('inventory_page', { inventories });
        })
        .catch((err) => {
            logData('Error finding inventories: ', err); // Log errors
            res.status(500).send('Internal server error');
        });
});

// Route handler for adding user to home page
app.post('/addUser', (req, res) => {
    const { username, bio } = req.body;
    logData('Received data for addUser: ', req.body); // Log received data

    if (!username || !bio) {
        return res.status(400).send('Username and bio are required');
    }

    const newUser = new UserSchema({
        username: username.trim(), // Trim inputs
        bio: bio.trim()
    });

    newUser.save()
        .then(() => {
            console.log('User added successfully');
            res.redirect('/');
        })
        .catch(error => {
            console.error(error);
            res.status(500).send('Internal server error');
        });
});

// Route handler for adding item to cart
app.post('/addToCart', (req, res) => {
    const { username, items } = req.body;
    let { itemPrices } = req.body;
    logData('Received data for addToCart: ', req.body); // Log received data

    const itemsArray = items.split(',');
    itemPrices = itemPrices.split(',').map(price => price.trim());

    if (itemsArray.length !== itemPrices.length) {
        return res.render('error', { message: 'Error: The number of items and prices must match.' });
    }

    const invalidPrice = itemPrices.find(price => isNaN(price) || !Number.isInteger(Number(price)));
    if (invalidPrice !== undefined) {
        return res.render('error', { message: `Error: Invalid price value '${invalidPrice}' provided. Prices must be integers.` });
    }

    itemPrices = itemPrices.map(price => parseInt(price, 10));

    const newCart = new CartSchema({
        username: username.trim(), // Trim inputs
        items: itemsArray.map(item => item.trim()), // Trim each item
        itemPrices
    });

    newCart.save()
        .then(() => {
            console.log('Item added to cart successfully');
            res.redirect('/cart_page');
        })
        .catch(error => {
            console.error(error);
            res.status(500).send('Internal server error');
        });
});

// Route handler for adding item to inventory
app.post('/addToInventory', (req, res) => {
    const { username, items, itemDescriptions } = req.body;
    logData('Received data for addToInventory: ', req.body); // Log received data

    if (!username || !items || !itemDescriptions) {
        return res.status(400).send('Username, items, and descriptions are required');
    }

    const itemsArray = items.split(',');
    const descriptionsArray = itemDescriptions.split(',');

    if (itemsArray.length !== descriptionsArray.length) {
        return res.render('error', { message: 'Error: The number of items and descriptions must match.' });
    }

    const newInventory = new InventorySchema({
        username: username.trim(), // Trim inputs
        items: itemsArray.map(item => item.trim()), // Trim each item
        itemDescriptions: descriptionsArray.map(desc => desc.trim()) // Trim each description
    });

    newInventory.save()
        .then(() => {
            console.log('Item added to inventory successfully');
            res.redirect('/inventory_page');
        })
        .catch(error => {
            console.error(error);
            res.status(500).send('Internal server error');
        });
});

// Route handler for deleting user from home page
app.delete('/deleteUser/:id', async (req, res) => {
    const userId = req.params.id;
    logData('Received request to delete user with ID: ', userId); // Log user ID

    try {
        const deletedUser = await UserSchema.findByIdAndDelete(userId);
        if (deletedUser) {
            console.log('User deleted successfully');
        } else {
            console.log('User not found');
        }
        res.redirect('/');
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal server error');
    }
});

// Route handler for deleting item from cart
app.delete('/deleteCartItem/:id', async (req, res) => {
    const cartItemId = req.params.id;
    logData('Received request to delete cart item with ID: ', cartItemId); // Log cart item ID

    try {
        const deletedItem = await CartSchema.findByIdAndDelete(cartItemId);
        if (deletedItem) {
            console.log('Cart item deleted successfully');
        } else {
            console.log('Cart item not found');
        }
        res.redirect('/cart_page');
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal server error');
    }
});

// Route handler for deleting item from inventory
app.delete('/deleteInventoryItem/:id', async (req, res) => {
    const inventoryItemId = req.params.id;
    logData('Received request to delete inventory item with ID: ', inventoryItemId); // Log inventory item ID

    try {
        const deletedItem = await InventorySchema.findByIdAndDelete(inventoryItemId);
        if (deletedItem) {
            console.log('Inventory item deleted successfully');
        } else {
            console.log('Inventory item not found');
        }
        res.redirect('/inventory_page');
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal server error');
    }
});

app.listen(process.env.PORT || 3000);
