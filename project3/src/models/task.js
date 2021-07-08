const mongoose=require('mongoose');
const validator=require('validator');

const Task=mongoose.model('Task',{
    description:{
        type:String,
        require:true,
    },
    status:{
        type:Boolean,
        required:true
    }
})

module.exports=Task;