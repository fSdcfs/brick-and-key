const express=require('express');

const buyRouter=express.Router();

const { getBuy, postBuy } = require('../controller/allController');

buyRouter.get('/buy/:itemId', getBuy);
buyRouter.post('/buy', postBuy);



module.exports=buyRouter;