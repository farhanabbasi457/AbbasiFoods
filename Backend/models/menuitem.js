const mongoose = require("mongoose");
const manuitem = mongoose.Schema({
    category_ID:{type:mongoose.Schema.Types.ObjectId ,ref :"category",required:true},
    name:{type:String ,required:true},
    description: {type:String, required:true},
    price: {type:String, required:true}
})

module.exports = mongoose.model("menuitem", manuitem);