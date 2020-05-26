const mongoose = require('mongoose');

let ourSchema = new mongoose.Schema({
    name: String,
    designation: String,
    salary: Number
});

//below we are modeling the above schema using the string 'Employee'
module.exports = mongoose.model('Employee', ourSchema);