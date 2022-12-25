
import multer from "multer";
import {GridFsStorage} from "multer-gridfs-storage";



const storage = new GridFsStorage({

    url:'mongodb://user:Ravish@ac-n7ucqu4-shard-00-00.cxnlpwl.mongodb.net:27017,ac-n7ucqu4-shard-00-01.cxnlpwl.mongodb.net:27017,ac-n7ucqu4-shard-00-02.cxnlpwl.mongodb.net:27017/?ssl=true&replicaSet=atlas-x68pjg-shard-0&authSource=admin&retryWrites=true&w=majority',
    option:{useUnifiedTopology:true,useNewUrlParser:true},
    file:(request,file)=>{
        const match=["image/png","image/jpg","image/jpeg"];

        if(match.indexOf(file.mimeType)=== -1)
        {
             return `${Date.now()}-file-${file.originalname}`;
        }

        return {
            bucketName:"photos",
            filename:`${Date.now()}-file-${file.originalname}`
        }
    }
})
export default multer({storage});