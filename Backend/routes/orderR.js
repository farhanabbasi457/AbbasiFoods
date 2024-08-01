const express=require("express");
const router=express.Router();

const orderC=require("../controller/orderC");
const order = require("../models/order");

router.get("/",orderC.orderTableget);
router.post("/",orderC.orderpost);
router.delete("/:order_number",orderC.orderdelete);
router.put("/:order_number",orderC.orderupdate);
router.get("/:order_number",orderC.orderget);
router.get("/orders/:orderid",orderC.orderIDget);

module.exports=router;