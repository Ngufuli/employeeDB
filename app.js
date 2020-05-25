const express = require('express');
const app = express();

const path = require('path');
const dotenv = require('dotenv');
const mongoose = require('mongoose');

dotenv.config({path: './config.env'});

//connecting to the database
mongoose.connect(process.env.DATABASE.LOCAL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
});

app.set('view', path.join(__dirname, 'view'));
app.set('view engine', 'ejs');

app.use(express.static('public'));


const port = process.env.PORT;
app.listen(port, ()=>{
    console.log(`Server has started on port: ${port}`);
})