const mongoose = require("mongoose");
const order = mongoose.Schema({
    order_number :{type:String ,required:true},
    user_ID:{type:mongoose.Schema.Types.ObjectId ,ref :"user",required:true},
    discount_ID:{type:mongoose.Schema.Types.ObjectId ,ref :"discount",required:true},
    orderdate:{type:String ,required:true},
    menuItems:{type:Array ,ref :"menuitem",required:true},
    totalamount: {type:String, required:true},
    paymentMethod: {type:String, required:true},
})

module.exports = mongoose.model("order", order);