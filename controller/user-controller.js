
import conversation from "../model/Conversation.js";
import message from "../model/Message.js";
import User from "../model/User.js"
import grid from "gridfs-stream";
import mongoose from "mongoose";
export const addUser=async (request,response)=>
{
   try{
     let exist= await  User.findOne({sub:request.body.sub});
     if(exist){
        response.status(200).json({msg:'user alredy exists'});
        return;
     }

    const newUser= new User(request.body);
    await newUser.save();
    response.status(200).json(newUser);
   }catch(error)
   {
       return response.status(500).json(error);
   }
}
export const getUsers=async(request,response)=>
{
    try{
          const users=  await  User.find({});
          return response.status(200).json(users);
    }catch(error)
    {
          return response.status(500).json(error.message);
    }
}

export const newConversation=async(request,response)=>
{
     try {
             const senderId=request.body.senderId;
             const receiverId=request.body.receiverId;

             const exist= await conversation.findOne({members:{$all:[receiverId,senderId]}});
             if(exist)
             {
                return response.status(200).json('conversation already exists');
             }
             const newConversation=new conversation({
                members:[senderId,receiverId]
             })
                 await newConversation.save();
             return response.status(200).json('conversation saved successfully');
     }catch(error)
     {
           return response.status(500).json(error.message);
     }
}


export const getConversation=async(request,response)=>
{
      try {
        const senderId=request.body.senderId;
        const receiverId=request.body.receiverId;

            let convert =   await conversation.findOne({members:{$all:[receiverId,senderId]}})
            return response.status(200).json(convert);
      }catch(error)
      {
        return response.status(500).json(error.message);
      }
}

export const newMessage=async(request,response)=>
{
        try{
          const newMessage =new message(request.body);
         await newMessage.save();
         await conversation.findByIdAndUpdate(request.body.conversationId,{message:request.body.text});
         return response.status(200).json("Message has been successfully")
        }catch(error)
        {
            return response.status(500).json(error.message);
        }
}

export const getMessage=async(request,response)=>
{
       try {
          const mess=await message.find({conversationId:request.params.id});
          return response.status(200).json(mess);
       }catch(error)
       {
        return response.status(500).json(error.message);
       }
}


const url="http://localhost:8000";

let gfs,gridFsBucket;
const conn = mongoose.connection;
conn.once('open',()=>
{
      gridFsBucket=new mongoose.mongo.GridFSBucket(conn.db,{
        bucketName:'fs'
    });
       gfs= grid(conn.db,mongoose.mongo);
       gfs.collection('fs');
})
export const uploadFile=async(request,response)=>
{
     if(!request.file)
     {
        return response.status(404).json('File not found');
     }

     const imageUrl=`${url}/file/${request.file.filename}`;
      return response.status(200).json(imageUrl);
}

export const getImage=async(request,response)=>
{
     try {
           const file=await gfs.files.findOne({filename:request.params.filename});
           const readStream = gridFsBucket.openDownloadStream(file._id);
           readStream.pipe(response);
     }catch(error)
     {
         return response.status(500).json(error.message);
     }
}