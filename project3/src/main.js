const express=require('express');
require('./db/mongo');
const User=require('./models/user');
const  Staff=require('./models/staff');
const Task=require('./models/task');
const userRouter=require('./routers/user');
const taskRouter=require('./routers/task');


const app=express();
const port=process.env.PORT || 3322;

app.use(express.json());
app.use(userRouter);
app.use(taskRouter);

app.listen(port,(()=>{
    console.log("Server is starting on "+port);
})
);







// app.get('/user', (req, res) => {
//     User.find({}).then((user) => {
//         res.send(user)
//     }).catch((e) => {
//         res.status(500).send()
//     })
// })

//User URL getting data by single ID

// app.get('/user/:id',(req,res)=>{
//     const id=req.params.id;

//     User.findById(id).then((user)=>{
//         if(!user){
//            return res.status(404).send();
//         }
//         res.send(user)
//     }).catch((e)=>{
//         res.status(500).send(e)
//     })
// })


//Staff URL

app.post('/staff',(req,res)=>{
    const staff=new Staff(req.body);
    staff.save().then(()=>{
        res.send(staff);
    }).catch((e)=>{
        res.status(400).send(e)
    })
});

app.get('/staff',(req,res)=>{
    Staff.find({}).then((staff)=>{
        res.send(staff)
    }).catch((e)=>{
        res.status(500).send(e);
    })
});

//Staff URL getting data by single ID

app.get('/staff/:id',(req,res)=>{
    const _id=req.params.id;

    Staff.findById(_id).then((staff)=>{
        if(!staff){
           return res.status(404).send();
        }
        res.send(staff)
    }).catch((e)=>{
        res.status(500).send(e)
    })
})

//Post method for Taks






// post and get opertaion on user by async and await 







//Updating 







//Deleting the data

