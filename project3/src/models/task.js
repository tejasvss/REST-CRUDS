const mongoose=require('mongoose');
const validator=require('validator');

const Task=mongoose.model('Task',{
    description:{
        type:String,
        require:true,
        trim:true
    },
    status:{
        type:Boolean,
        default:false
    },
    owner:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'User'
    }
})

module.exports=Task;