const express = require('express');
const router = express.Router();
const path = require('path');


router.get('/home',(req,res)=>{
    res.sendFile(path.join(__dirname,'../views','home.html'));
});
router.get('/cart',(req,res)=>{
    res.sendFile(path.join(__dirname,'../views','cart.html'));
});
router.get('/kitchen/customize',(req,res)=>{
    res.sendFile(path.join(__dirname,'../views','kitchen-customization.html'));
});
router.get('/kitchen',(req,res)=>{
    res.sendFile(path.join(__dirname,'../views','kitchen.html'));
});
router.get('/profile',(req,res)=>{
    res.sendFile(path.join(__dirname,'../views','profile.html'));
});
router.get('/sign-in',(req,res)=>{
    res.sendFile(path.join(__dirname,'../views','sign-in.html'));
});
router.get('/sign-up',(req,res)=>{
    res.sendFile(path.join(__dirname,'../views','sign-up.html'));
});
router.get('/orders',(req,res)=>{
    res.sendFile(path.join(__dirname,'../views','orders.html'));
});
router.get('/carts',(req,res)=>{
    res.sendFile(path.join(__dirname,'../views','all_carts.html'));
});

module.exports = router;