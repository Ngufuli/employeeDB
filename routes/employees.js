const express = require('express');
const router = express.Router();

router.get('/', (req, res)=>{
    res.render('index');
});

router.get('/employees/new', (req, res)=>{
    res.render('new');
})

module.exports = router;