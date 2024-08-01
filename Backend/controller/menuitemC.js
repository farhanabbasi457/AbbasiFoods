const menuitem= require("../models/menuitem");

exports.menuitemget=async (req, resp) => {

    const data = await menuitem.find({ name: {$regex:new RegExp(req.params.menuitem_name,"i")} }); //i->ignore all cases
    if (data.length !== 0) {
        resp.send({
                success: true,
                message: data
        });
        
    } else {
        resp.send("menuitem not found");
    }
};
exports.menuitemupdate=async (req, resp) => {

    const data = await menuitem.updateOne({ name: req.params.menuitem_name },{$set:req.body}); //i->ignore all cases{
        if (data.matchedCount === 0) {
            resp.send({
                success: false,
                message: data.matchedCount
            });
        } else {
            resp.send({
                success: true,
                message: data.matchedCount
            });
        }
};
exports.menuitemdelete=async (req, resp) => {

    const data = await menuitem.deleteOne({ name: req.params.menuitem_name }); //i->ignore all cases{
        if (data.deletedCount === 0) {
            resp.send({
                success: false,
                message: data.deletedCount
            });
        } else {
            resp.send({
                success: true,
                message: data.deletedCount
            });
        }
};


exports.menuitempost=async (req, resp) => {
    const data = new menuitem(req.body);
    const res = await data.save();
    if(res===true){
        resp.send(
            {success:true,
             message:1 
            }
            
        );
    }
    else{
        resp.send(
            {success:true,
             message:0
            }
            
        );
    }
    
};