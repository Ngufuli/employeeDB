const express = require('express');
const router = express.Router();

const Employee = require('../models/employee');

//get requests start here
router.get('/', (req, res)=>{
    Employee.find({})
        .then(employees =>{
            res.render('index', {employees: employees});
        })
        .catch(err=>{
            req.flash('error_msg', "ERROR: "+error);
            res.redirect('/');
        })
    
});

router.get('/employee/new', (req, res)=>{
    res.render('new');
});

router.get('/employee/search', (req, res)=>{
    res.render('search', {employee: ''});
});

router.get('/employee', (req, res)=>{
    let searchQuery = {
        name: req.query.name
    }
    Employee.findOne(searchQuery)
        .then(employee =>{
            res.render('search', {employee: employee});
        })
        .catch(err=>{
            req.flash('error_msg', "ERROR: "+error);
            res.redirect('/');
        });
});

router.get('/edit/:id', (req, res)=>{
    let searchQuery = {
        _id: req.params.id
    }
    Employee.findOne(searchQuery)
        .then(employee=>{
            res.render('edit', {employee: employee})
        })
        .catch(error=>{
            req.flash('error_msg', "ERROR: "+error);
            res.redirect('/');
        })
});

//get requests ends here


//post requests starts here
router.post('/employee/new', (req, res)=>{
    //below is the object that will collect data from the form
    let newEmployee = {
        name: req.body.name,
        designation: req.body.designation,
        salary: req.body.salary
    }

    Employee.create(newEmployee)
        .then(employee =>{ 
            req.flash('success_msg', "Employee added to database successfully");
            res.redirect('/');
        })
        .catch(err =>{
            req.flash('error_msg', "ERROR: "+error);
            res.redirect('/');
        })

})
//post requests end here

//put request start here
router.put('/edit/:id', (req, res)=>{
    let searchQuery = {
        _id: req.params.id
    }
    Employee.update(searchQuery, {$set: {
        name: req.body.name,
        designation: req.body.designation,
        salary: req.body.designation
    }})
    .then(employee =>{
        req.flash('success_msg', "Employee updated successfully");
        res.redirect('/')
    })
    .catch(error=>{
        req.flash('error_msg', "ERROR: "+error);
        res.redirect('/');
    })
});
//put request end here

//delete request starts here

router.delete('/delete/:id', (req, res)=>{
    let searchQuery = {
        _id: req.params.id
    }

    Employee.deleteOne(searchQuery)
        .then(employee=>{
            req.flash('success_msg', "Employee deleted successfully");
            res.redirect('/');
        })
        .catch(error=>{
            req.flash('error_msg', "ERROR: "+error);
            res.redirect('/');
        })
})

//delete request ends here

module.exports = router;