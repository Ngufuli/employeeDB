const express = require('express');
const app = express();

const path = require('path');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const ejs = require('ejs');
const session = require('express-session');
const flash = require('connect-flash');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');

const employeeRoutes = require('./routes/employees');

dotenv.config({path: './config.env'});

//connecting to the database
mongoose.connect(process.env.DATABASE_LOCAL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
});

app.use(bodyParser.urlencoded({extended: true}));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.static('public'));

//middleware for method override
app.use(methodOverride('_method'));

//middleware for express session
app.use(session({
    secret: 'express', 
    resave: true,
    saveUninitialized: true
}))

//middleware for connect flash 
app.use(flash());

//setting messages variables globally
app.use((req, res, next)=>{
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    next();
});

app.use(employeeRoutes);

const port = process.env.PORT;
app.listen(port, ()=>{
    console.log(`Server has started on port: ${port}`);
})