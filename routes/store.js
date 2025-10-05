const express=require('express');

const storeRouter=express.Router();

const {getstore}=require('../controller/allController')

storeRouter.get('/store',getstore);


module.exports=storeRouter;