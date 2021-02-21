'use strict';

require('dotenv').config();

//going to have my server info in here.
const express = require('express');

const app = express();

const mongoose = require('mongoose');



// setting up our DB connection 
mongoose.connect(process.env.DATABASE_URL, {useNewUrlParser: true});

const db = mongoose.connection;

//checks if there is any erros connectiing to the db
db.on('error', (error) => console.error(error));

//only opens ones // to let us know we have opened the db
db.once('open', () => console.log('Connection has been opened'));

//setting up json

app.use(express.json());


const subscribersRouter = require('./routes/subscribers');

app.use('/subscribers', subscribersRouter);


app.listen(4000, () => console.log(`Server has started`));

