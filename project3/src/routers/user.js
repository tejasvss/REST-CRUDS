const express = require('express')
const multer=require('multer');
const User = require('../models/user')
const auth = require('../middleware/auth')
const router = new express.Router()
const sharp=require('sharp');
const {sendWelcomeEmail,cancelEmail}=require('../emails/account')



router.post('/user', async (req, res) => {
    const user = new User(req.body)

    try {
        await user.save()
        sendWelcomeEmail(user.email,user.name)
        const token = await user.generateAuthToken()
        res.status(201).send({ user, token })
    } catch (e) {
        res.status(400).send(e)
    }
})

router.post('/user/login', async (req, res) => {
    try {
        const user = await User.findByCredentials(req.body.email, req.body.password)
        const token = await user.generateAuthToken()
        res.send({user,token})
        //For hiding the user details
        // res.send({ user:user.getPublicProfile(), token })
    } catch (e) {
        res.status(400).send()
    }
})

router.post('/user/logout',auth,async(req,res)=>{
     try{
         req.user.tokens=req.user.tokens.filter((token)=>{
             return token.token!==req.token
         })
         await req.user.save();
         res.send();

     }catch(e){
    res.status(500).send();
     }

})

router.post('/user/logoutAll',auth,async(req,res)=>{
    try{
req.user.tokens=[];
await req.user.save();
res.send();
    }
    catch(e){
   res.status(500).send()
    }
})

router.get('/user',auth,async(req,res)=>{
    try{
        const user=await User.find({});
        res.send(user)
    }
    catch(e){
        res.status(500).send()
    }
})

router.get('/user/me', auth, async (req, res) => {
    res.send(req.user)
})

router.get('/user/:id', async (req, res) => {
    const _id = req.params.id

    try {
        const user = await User.findById(_id)

        if (!user) {
            return res.status(404).send()
        }

        res.send(user)
    } catch (e) {
        res.status(500).send()
    }
})

// router.patch('/user/:id', async (req, res) => {
//     const updates = Object.keys(req.body)
//     const allowedUpdates = ['name', 'email', 'password', 'age']
//     const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

//     if (!isValidOperation) {
//         return res.status(400).send({ error: 'Invalid updates!' })
//     }

//     try {
//         const user = await User.findById(req.params.id)

//         updates.forEach((update) => user[update] = req.body[update])
//         await user.save()

//         if (!user) {
//             return res.status(404).send()
//         }

//         res.send(user)
//     } catch (e) {
//         res.status(400).send(e)
//     }
// })

// router.delete('/user/:id', async (req, res) => {
//     try {
//         const user = await User.findByIdAndDelete(req.params.id)

//         if (!user) {
//             return res.status(404).send()
//         }

//         res.send(user)
//     } catch (e) {
//         res.status(500).send()
//     }
// })

router.delete('/user/me',auth,async(req,res)=>{
    try
    {
   await req.user.remove();
   cancelEmail(req.user.email,req.user.name);
    res.status(200).send(`Account deleted Successfully for the user ${req.user.name}`)
    }
    catch(e)
    {
res.status(500).send(e)
    }
})

router.patch('/user/me',auth, async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['name', 'email', 'password', 'age']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid updates!' })
    }

    try {

        updates.forEach((update) => req.user[update] = req.body[update])
        await req.user.save()
        res.send(req.user);
        
    } catch (e) {
        res.status(400).send(e)
    }
})

const upload=multer({
    limits:{
        fileSize:1000000,

    },
    fileFilter(req,file,cb){
        if(!file.originalname.match(/\.(jpg|jpeg|png)$/)){
            return cb(new Error("Please upload the images in png,jpg,jpeg types file"))
        }
        cb(undefined,true)
    }


})
router.post('/user/me/avatar',auth,upload.single('avatar'),async(req,res)=>{

    const buffer=await sharp(req.file.buffer).png().resize({width:1000,height:1000}).toBuffer()
    // req.user.avatar=req.file.buffer
    req.user.avatar=buffer;
    await req.user.save()
    res.send("Succsesfully uploaded");

},(error,req,res,next)=>{
    res.status(400).send({
        error:error.message
    })
})
router.delete('/user/me/avatar',auth,async(req,res)=>{
    req.user.avatar=undefined;
    await req.user.save();
    res.send("Deleted the image successfully")
})

router.get('/user/:id/avatar',async(req,res)=>{
  try{
    const user=await User.findById(req.params.id);
    if(!user || !user.avatar){
        throw new Error()

    }
    res.set('Content-Type','image/png')
    res.send(user.avatar)
    
  }
  catch(e){
      res.status(404).send();
  }
})
module.exports = router