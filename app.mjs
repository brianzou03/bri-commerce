import './config.mjs';
import './db.mjs'; // Import UserSchema model
import express from 'express'
import methodOverride from 'method-override';
import mongoose from 'mongoose';
import url from 'url';
import path from 'path'


const app = express();

const UserSchema = mongoose.model('UserSchema');

const __dirname = path.dirname(url.fileURLToPath(import.meta.url));
app.use(express.static(path.join(__dirname, 'public')));


// configure templating to hbs
app.set('view engine', 'hbs');

// body parser (req.body)
app.use(express.urlencoded({ extended: false }));


// Use method-override middleware to handle the DELETE request
app.use(methodOverride('_method'));

app.get('/', (req, res) => {
    const query = {};
    if (req.query.username){
        query.username = req.query.username;
    }
    if (req.query.cart){
        query.cart = req.query.cart;
    }
    if (req.query.inventory){
        query.inventory = req.query.inventory;
    } 
    console.log(query);

    UserSchema.find(query)
        .then(users => {
            console.log('Users found: ', users); // if users found
            res.render('home', { users });
        })
        .catch(error => {
            console.error(error);
            res.status(500).send('Internal server error');
        });
});

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


// add user
app.post('/addUser', (req, res) => {
    const { username, cart, inventory } = req.body;

    // Split the comma-separated values into arrays
    const cartArray = cart.split(',').map(item => item.trim());
    const inventoryArray = inventory.split(',').map(item => item.trim());

    const newUser = new UserSchema({
        username,
        cart: cartArray, // Assign the array
        inventory: inventoryArray, // Assign the array
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

