const express=require('express');

const editRouter=express.Router();

const {getEdit, postEdit}=require('../controller/allController')

editRouter.get('/edit/:itemId',getEdit);

editRouter.post('/edit',postEdit);










module.exports=editRouter;