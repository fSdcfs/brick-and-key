const express=require('express');

const detailsRouter=express.Router();


const {getdetails}=require('../controller/allController');

detailsRouter.get('/details/:productId',getdetails);








module.exports=detailsRouter;