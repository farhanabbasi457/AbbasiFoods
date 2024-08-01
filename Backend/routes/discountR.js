const express=require("express");
const router=express.Router();

const discountC=require("../controller/discountC");

router.get("/:discount_name",discountC.discountget);
router.post("/",discountC.discountpost);
router.delete("/:discount_name",discountC.discountdelete);
router.put("/:discount_name",discountC.discountupdate);

module.exports=router;