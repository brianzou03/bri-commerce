import express from 'express'
import path from 'path'
import { fileURLToPath } from 'url';
import './config.mjs';
import './db.mjs';
import mongoose from 'mongoose';

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const BrianSchema = mongoose.model('BrianSchema'); // import schema from db

// configure templating to hbs
app.set('view engine', 'hbs');

// body parser (req.body)
app.use(express.urlencoded({ extended: false }));

app.get('/', (req, res) => {
    res.render('home');
});

app.listen(process.env.PORT || 3000);

// Database setup: 
// mongosh -> use briandb
// db.briandb.find()
// db.briandb.insert({exampleValue: "Hello", exampleValue2: 1});
