import express from 'express';
import Connection from './database/db.js';
import Route from './routes/route.js';
import cors from 'cors';
import bodyParser from 'body-parser';
import path from 'path';
const app=express();

app.use(cors());
app.use(bodyParser.json({extended:true}));
app.use(bodyParser.urlencoded({extended:true}))
app.use('/',Route);

Connection();

const PORT=8000;

app.listen(PORT,()=>{
    console.log(`Server is running successfully on ${PORT}`);
})
app.get("/",(req,res)=>
{
    
    res.send("Api is Running Successfully");
});
/*
const _dirname1=path.resolve();
if("production"==="production")
{
    app.use(express.static(path.join(_dirname1,"../whatsapp-clone/build")))
    app.get("/",(req,res)=>
    {
        res.sendFile(path.resolve(_dirname1,"/whatsapp-clone","build","index.html"))
    })
} else {
    app.get("/",(req,res)=>
    {
        
        res.send("Api is Running Successfully");
    });
}
*/