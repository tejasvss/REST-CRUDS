const mongoose=require('mongoose');
const mongodb=require('mongodb');
const validator=require('validator');

mongoose.connect('mongodb+srv://cluster0.cz1dd.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',{
    dbName:'DMART',
    user:'teja1997',
    pass:'DNNk3yxaqnJtv7b',
    useNewUrlParser:true,
    useUnifiedTopology:true,
useFindAndModify:false})
    .then(()=>{
    console.log("Mongo cloud 2 connected");
})
