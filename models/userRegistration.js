const mongoose = require('mongoose')
const userRegistration = new mongoose.Schema({
    fullName:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true,
    },
    mobileNumber:{
        type:Number,
        required:true,
    },
    dob:{
        type:Date,
        required:true,
    },
    gender:{
        type:String,
        
    },
    address:[
        {
            houseName:{type:String,required:true},
            city:{type:String,required:true},
            district:{type:String,required:true},
            state:{type:String,required:true},
            pin:{type:Number,required:true},

        }
    ],
    bloodGroup:{
        type:String,
        required:true
    },
    last_Donated_Date:{
        type:Date
    },
    isVerified:{type:Boolean,default:false}
},{timestamps:true})

const user = mongoose.model('signup',userRegistration)
module.exports = user