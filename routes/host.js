const express=require('express');

const hostRouter=express.Router();

const {  gethostProduct, gethost, posthost}=require('../controller/allController')

hostRouter.get('/host',gethost);

hostRouter.post('/host',posthost);




//host store

hostRouter.get('/hoststore',gethostProduct);



exports.hostRouter=hostRouter;

