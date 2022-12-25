import mongoose from 'mongoose';

const Connection=async()=>
{
    const URL='mongodb://user:Ravish@ac-n7ucqu4-shard-00-00.cxnlpwl.mongodb.net:27017,ac-n7ucqu4-shard-00-01.cxnlpwl.mongodb.net:27017,ac-n7ucqu4-shard-00-02.cxnlpwl.mongodb.net:27017/?ssl=true&replicaSet=atlas-x68pjg-shard-0&authSource=admin&retryWrites=true&w=majority';

    try{
         await mongoose.connect(URL,{useUnifiedTopology:true});
        console.log("Database connected successfully");
     
    }catch(err)
    {console.log(err.message)};
    
}

export default Connection;