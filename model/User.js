const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
    
    useremail:{
        type:String,
        requied: true
    },
    firstname:{
        type:String,
        requied: true
    },
    lastname:{
        type:String,
        requied: true
    },
    username:{
        type:String,
        required: true
    },
    roles:{
        User: {
        type:Number,
        default:2001
        },
        Admin:Number
    },
    password:{
        type:String,
        required: true
    },
    refreshtoken: String
})

module.exports = mongoose.model('User',userSchema)