const express=require("express");
const router=express.Router();

const menuitemC=require("../controller/menuitemC");

router.get("/:menuitem_name",menuitemC.menuitemget);
router.post("/",menuitemC.menuitempost);
router.delete("/:menuitem_name",menuitemC.menuitemdelete);
router.put("/:menuitem_name",menuitemC.menuitemupdate);

module.exports=router;