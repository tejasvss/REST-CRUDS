const mongoose=require('mongoose');
const validator=require('validator');

const Staff=mongoose.model('Staff',{
    empname:{
        type:String,
        trim:true
    },
    experience:{
        type:Number,
        required:true,
        validate(value){
            if(value<3){
                throw new Error("Below 3 years exp candiadate is not eligible")
            }
        }

    }
})

module.exports=Staff;