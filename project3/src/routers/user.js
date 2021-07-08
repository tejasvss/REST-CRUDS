const express=require('express');
const User=require('../models/user');
const router=new express.Router();

router.post('/user',async(req,res)=>{
    const user=new User(req.body)
    try{
    await user.save();
    res.status(200).send(user)
    }
    catch(e){
 res.status(400).send(e)
    }
})

router.get('/user',async(req,res)=>{
    
    try{
  
        const user=await User.find({})  ;
    res.status(200).send(user)
    }
    catch(e){
        res.status(400).send()

    }
})

router.get('/user/:id',async(req,res)=>{
    const id=req.params.id;
    try{
const user=await User.findById(id);
if(!user){
    return res.status(404).send()
}
res.send(user);
    }
    catch(e){
        res.status(500).send(e)

    }
})


//updating

router.patch('/user/:id',async(req,res)=>{
    const updates=Object.keys(req.body);
    const allowedUpdates=['name','age','location']
    const isValidOperation=updates.every((update)=>allowedUpdates.includes(update))
    
    if(!isValidOperation){
        return res.status(404).send({error:"Invalid Updates"})
    }
   try{ 
    
      const user=await User.findByIdAndUpdate(req.params.id,req.body,{new:true,runValidators:true})
   if(!user){
       return res.status(404).send()
   }
   res.send(user)
   }
   catch(e){ 
       res.status(400).send(e)

   }
})

//Deleting

router.delete('/user/:id',async(req,res)=>{
    try{
const user=await User.findByIdAndDelete(req.params.id)
if(!user){
    return res.status(404).send()
}
res.send(user)
    }
    catch(e){
        res.status(500).send();

    }
})

module.exports=router;