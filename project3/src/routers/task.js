const express=require('express');
const router=new express.Router();
const Task=require('../models/task');

router.post('/task',(req,res)=>{
    const task=new Task(req.body);

    task.save().then(()=>{
        res.send(task);
    }).catch((e)=>{
        res.status(400).send(e)
    })
});
router.get('/task', (req, res) => {
    Task.find({}).then((task) => {
        res.send(task)
    }).catch((e) => {
        res.status(500).send()
    })
});
router.get('/task/:id',async(req,res)=>{
    const id=req.params.id;
    try{
const task=await Task.findById(id);
if(!task){
    return res.status(404).send()
}
res.send(task);
    }
    catch(e){
        res.status(500).send(e)

    }
})

router.patch('/task/:id',async(req,res)=>{
    const updates=Object.keys(req.body);
    const allowedUpdates=['description','status']
    const isValidOperation=updates.every((update)=>allowedUpdates.includes(update))
    
    if(!isValidOperation){
        return res.status(404).send({error:"Invalid Updates"})
    }
   try{ 
    
      const task=await Task.findByIdAndUpdate(req.params.id,req.body,{new:true,runValidators:true})
   if(!task){
       return res.status(404).send()
   }
   res.send(task)
   }
   catch(e){ 
       res.status(400).send(e)

   }
})

//Deleting

router.delete('/task/:id',async(req,res)=>{
    try{
const task=await Task.findByIdAndDelete(req.params.id)
if(!task){
    return res.status(404).send()
}
res.send(task)
    }
    catch(e){
        res.status(500).send();

    }
})


module.exports=router;