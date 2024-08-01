const staff= require("../models/staff");

exports.staffget=async (req, resp) => {

    const data = await staff.find({ name: {$regex:new RegExp(req.params.staff_name,"i")} } ); //i->ignore all cases
    if (data.length !== 0) {
        resp.send({
                success: true,
                message: data
        });
        
    } else {
        resp.send("staff not found");
    }
};
exports.staffupdate=async (req, resp) => {

    const data = await staff.updateOne({ name: req.params.staff_name },{$set:req.body}); //i->ignore all cases{
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
exports.staffdelete=async (req, resp) => {

    const data = await staff.deleteOne({ name: req.params.staff_name }); //i->ignore all cases{
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


exports.staffpost=async (req, resp) => {
    const data = new staff(req.body);
    const res = await data.save();
    resp.send("Inserted Successfully");
};