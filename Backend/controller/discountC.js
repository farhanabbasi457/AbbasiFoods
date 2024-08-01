const discount= require("../models/discount");

exports.discountget=async (req, resp) => {

    const data = await discount.find({ name: {$regex:new RegExp(req.params.discount_name,"i")} }); //i->ignore all cases
    if (data.length !== 0) {
        resp.send({
                success: true,
                message: data
        });
        
    } else {
        resp.send("discount not found");
    }
};
exports.discountupdate=async (req, resp) => {

    const data = await discount.updateOne({ name: req.params.discount_name },{$set:req.body}); //i->ignore all cases{
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
exports.discountdelete=async (req, resp) => {

    const data = await discount.deleteOne({ name: req.params.discount_name }); //i->ignore all cases{
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


exports.discountpost=async (req, resp) => {
    const data = new discount(req.body);
    const res = await data.save();
    resp.send("Inserted Successfully");
};