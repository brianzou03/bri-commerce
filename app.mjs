import './config.mjs';
import './db.mjs';
import express from 'express';
import methodOverride from 'method-override';
import mongoose from 'mongoose';

const app = express();

// Schemas
const UserSchema = mongoose.model('users');
const CartSchema = mongoose.model('carts'); 
const InventorySchema = mongoose.model('inventories');

import url from 'url';
import path from 'path'
const __dirname = path.dirname(url.fileURLToPath(import.meta.url));
app.use(express.static(path.join(__dirname, 'public')));

// configure templating to hbs
app.set('view engine', 'hbs');

// body parser (req.body)
app.use(express.urlencoded({ extended: false }));

// Use method-override middleware to handle the DELETE request
app.use(methodOverride('_method'));

// route handler for GET to home.hbs
app.get('/', (req, res) => {
    // TODO: enable adding items to cart
    UserSchema.find()
        .then((users) => {
            console.log('Users found: ', users); // if users found
            res.render('home', { users });
        })
        .catch((err) => {
            console.error(err);
            res.status(500).send('Internal server error');
        });
});


// TODO: pull updates from AWS terminal to reflect in deployment

// route handler for cart page
app.get('/cart_page', (req, res) => {
    CartSchema.find()
        .then((carts) => {
            console.log('Cart found: ', carts); // if cart found
            res.render('cart_page', { carts });
        })
        .catch((err) => {
            console.error(err);
            res.status(500).send('Internal server error');
        });
});


//route handler for inventory page
app.get('/inventory_page', (req, res) => {
    InventorySchema.find()
        .then((inventories) => {
            console.log('Inventory found: ', inventories); // if inventory found
            res.render('inventory_page', { inventories });
        })
        .catch((err) => {
            console.error(err);
            res.status(500).send('Internal server error');
        });
});



// delete user route
app.delete('/deleteUser/:id', async (req, res) => {
    const userId = req.params.id;

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


// add user route
app.post('/addUser', (req, res) => {
    const { username, bio } = req.body;

    const newUser = new UserSchema({
        username,
        bio
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

app.listen(process.env.PORT || 3000);

