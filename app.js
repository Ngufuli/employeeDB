const express = require('express');
const app = express();

const path = require('path');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const ejs = require('ejs');

const employeeRoutes = require('./routes/employees');

dotenv.config({path: './config.env'});

//connecting to the database
mongoose.connect(process.env.DATABASE_LOCAL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
});

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.static('public'));

app.use(employeeRoutes);

const port = process.env.PORT || 4242;
app.listen(port, ()=>{
    console.log(`Server has started on port: ${port}`);
})