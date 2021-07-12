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

//methods maintenance

// app.use((req,res,next)=>{
// //   console.log(req.method,req.path);
// //   next()
// if(req.method==='POST'){
// res.send("New requests are disabled");
// }else{
//     next();
// }

// })

//Maintenance under message mode for every request

// app.use((req,res,next)=>{
//     res.send("This Website page is under Maintenenace come back after some time");
// })

app.use(express.json());
app.use(userRouter);
app.use(taskRouter);
  
app.listen(port,(()=>{
    console.log("Server is starting on "+port);
})
);

// const myFunction=async()=>{
 
// const password="Tej@1997";
// const hashPassword=await bcrypt.hash(password,8);

// console.log(password);
// console.log(hashPassword);

// const isMatch=await bcrypt.compare("Tj@1997",hashPassword);
// console.log(isMatch);

// }

// myFunction();

// const myFunction=async()=>{
//     const token=jwt.sign({_id:'abc123'},'thisismynewcourse',{expiresIn:'5 seconds'})
// console.log(token);

// const data=jwt.verify(token,'thisismynewcourse');
// console.log(data);
// }
// myFunction()

const main=async()=>{
const task=await Task.findById('60ec36077d3c6009701c3266');
await task.populate('owner').execPopulate()
console.log(task.owner)

}
main()