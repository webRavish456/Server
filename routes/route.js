import express from 'express';
import upload from "../Upload.js";

import { newConversation,getConversation,newMessage, getMessage,uploadFile,getImage} from '../controller/user-controller.js';
import {addUser,getUsers} from '../controller/user-controller.js'
const route=express.Router();

route.post('/add',addUser);
route.get('/users',getUsers);

route.post('/conversation/add',newConversation);
route.post('/conversation/get',getConversation);

route.post('/message/add',newMessage);
route.get('/message/get/:id',getMessage);

route.post('/file/upload',upload.single("file"), uploadFile);
route.get('/file/:filename',getImage);

export default route;

