import express from 'express'
import path from 'path'
import { fileURLToPath } from 'url';
import './config.mjs';
import './db.mjs';
import mongoose from 'mongoose';

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(express.static(path.join(__dirname, 'public')));

const UserSchema = mongoose.model('UserSchema'); // import schema from db


// configure templating to hbs
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

// body parser (req.body)
app.use(express.urlencoded({ extended: false }));

app.get('/', async (req, res) => {
    UserSchema.find()
        .then(users => {
            res.render('home', {users});
        })
        .catch(error => {
            console.error(error);
            res.status(500).send('Internal server error');
        });
});

app.listen(process.env.PORT || 3000);

// Database setup: 
// mongosh -> use briandb
// db.UserSchema.find()
// db.UserSchema.insert({username: "Brian", hash: "123", cart: "potato", inventory: "null", picture: "null", bio: "null"});
