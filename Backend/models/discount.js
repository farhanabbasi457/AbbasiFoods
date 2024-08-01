const mongoose = require("mongoose");
const discount = mongoose.Schema({
    name:{type:String ,required:true},
    description:{type:String ,required:true},
    days: {type:String, required:true},
    percentage: {type:String, required:true},
})

module.exports = mongoose.model("discount", discount);