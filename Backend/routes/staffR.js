const express=require("express");
const router=express.Router();

const staffC=require("../controller/staffC");

router.get("/:staff_name",staffC.staffget);
router.post("/",staffC.staffpost);
router.delete("/:staff_name",staffC.staffdelete);
router.put("/:staff_name",staffC.staffupdate);

module.exports=router;