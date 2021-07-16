const express=require('express');
require('./db/mongo');
const User=require('./models/user');
const  Staff=require('./models/staff');
const Task=require('./models/task');
const userRouter=require('./routers/user');
const taskRouter=require('./routers/task');
const bcrypt=require('bcryptjs');
const jwt=require('jsonwebtoken');
const auth=require('./middleware/auth')

const app=express();
const port=process.env.PORT || 3322;

const multer=require('multer');
const upload=multer({
    dest:'images',
    limits:{
        fileSize:1000000
    },
    fileFilter(req,file,cb){
        if(!file.originalname.match(/\.(doc|docx)$/)){
           return cb(new Error("Please Upload a Word Document"))
        }
     cb(undefined,true);
    }
})

app.post('/upload',upload.single('upload'),(req,res)=>{
    res.send()
},(error,req,res,next)=>{
    res.status(400).send({
        error:error.message
    })
})


app.use(express.json());
app.use(userRouter);
app.use(taskRouter);
  
app.listen(port,(()=>{
    console.log("Server is starting on "+port);
})
);

