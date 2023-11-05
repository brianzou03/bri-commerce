import express from 'express'
import methodOverride from 'method-override';
import path from 'path'
import { fileURLToPath } from 'url';
import './config.mjs';
import UserSchema from './db.mjs'; // Import UserSchema model
import mongoose from 'mongoose';

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(express.static(path.join(__dirname, 'public')));


// configure templating to hbs
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

// body parser (req.body)
app.use(express.urlencoded({ extended: false }));

// Use method-override middleware to handle the DELETE request
app.use(methodOverride('_method'));

app.get('/', async (req, res) => {
    UserSchema.find()
        .then(users => {
            console.log('Found!');
            console.log(users); // Log the 'users' array
            res.render('home', { users });
        })
        .catch(error => {
            console.error(error);
            res.status(500).send('Internal server error');
        });
});

// Delete user route
app.delete('/deleteUser/:userId', async (req, res) => {
    const userId = req.params.userId;

    // Use the userId to delete the user from the database
    UserSchema.findByIdAndRemove(userId, (err) => {
        if (err) {
            console.error(err);
            res.status(500).send('Internal server error');
        } else {
            console.log('User deleted successfully');
            res.redirect('/');
        }
    });
});

// add user
app.post('/addUser', async (req, res) => {
    const { username, cart, inventory } = req.body;
    const newUser = new UserSchema({
        username,
        cart,
        inventory
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

