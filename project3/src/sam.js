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

// const main=async()=>{
// // const task=await Task.findById('60ec3495806e244d9c50f949');
// // await task.populate('owner').execPopulate()
// // console.log(task.owner)
// const user=await User.findById('60ec3495806e244d9c50f949');
// await user.populate('tasks').execPopulate()
// console.log(user.tasks)

// }
// main()

