const mongoose=require('mongoose');
const validator=require('validator');

const User=mongoose.model('User',{
        name:{
            type:String,
    required:true,
    trim:true,
},
age:{
    type:Number,
    default:0,
    validate(value){
        if(value<0){
            throw new Error("Age must be greater than zero")
        }
    }
},
location:{
    type:String,
    trim:true

}

})

module.exports=User