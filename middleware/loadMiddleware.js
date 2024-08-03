const express = require('express');
const router = express.Router();

router.use((req,res,next)=>{
    if(req.method == 'TRACE'){
        res.status(405).send('Method Prohibited');
    }else{
        next();
    }
   
});

module.exports=router;

