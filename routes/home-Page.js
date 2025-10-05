const express=require('express');

const homeRouter=express.Router();

const {gethome}=require('../controller/allController')

homeRouter.get('/',gethome);






module.exports=homeRouter;