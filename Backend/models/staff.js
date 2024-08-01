const mongoose = require("mongoose");
const staff = mongoose.Schema({
    name:{type:String ,required:true},
    role: {type:String, required:true},
    phonenumber: {type:String, required:true},
})

module.exports = mongoose.model("staff", staff);