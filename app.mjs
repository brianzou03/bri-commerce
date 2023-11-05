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

