const express = require('express');
const cors = require('cors');
const colors = require('colors');
require('dotenv').config();
const connectDB = require('./dbinit');
const user = require('./routes/user');


const app = express();

app.use(express.json());
app.use(cors());
const PORT = process.env.PORT ||  8080;
connectDB();

app.get('/', (req, res) => {
    res.send('Welcome to Auth');
});

app.use('/user', user);

app.listen(PORT, () => {
    console.log(`Firing from http://localhost: ${PORT}`.rainbow )
});