const express=require('express');

const deleteRouter=express.Router();

const{PostHostdelete, postdeleteCart}=require('../controller/allController')

deleteRouter.post('/delete/:itemId',PostHostdelete);



//delete Cart

deleteRouter.post('/cart/delete/:itemId',postdeleteCart);









module.exports=deleteRouter;