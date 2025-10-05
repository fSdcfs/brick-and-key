const express=require('express');

const cartRouter=express.Router();

const { getCart, postCart } = require('../controller/allController');



cartRouter.get('/cart',getCart,);

cartRouter.post('/cart',postCart);





module.exports=cartRouter;