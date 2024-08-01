const mongoose = require("mongoose");
const users = mongoose.Schema({
    name:{type:String ,required:true},
    email: {type:String, required:true},
    password: {type:String, required:true},
    role:{type:String},
    address:{type:String , required :true},
    phone:{type:String , required :true}
})

module.exports = mongoose.model("user", users);