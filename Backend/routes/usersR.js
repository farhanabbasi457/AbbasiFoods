const express=require("express");
const router=express.Router();

const userC=require("../controller/usersC");

router.get("/",userC.usersTableget);
router.post("/",userC.userspost);
router.delete("/:email",userC.usersdelete);
router.get("/users/",userC.usersUserget);
router.get("/datasingle/:name1",userC.usersSingleget);
router.get("/:state",userC.usersget);

module.exports=router;