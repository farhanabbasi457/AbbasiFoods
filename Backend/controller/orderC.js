const order= require("../models/order");
const mongoose = require('mongoose');

exports.orderget=async (req, resp) => {

    const data = await order.find({ name: req.params.order_number }); //i->ignore all cases
    if (data.length !== 0) {
        resp.send({
                success: true,
                message: data
        });
        
    } else {
        resp.send("order not found");
    }
};
exports.orderIDget = async (req, resp) => {
    try {
        const data = await order.find({ user_ID: req.params.orderid });

        if (data.length > 0) {
            resp.send({
                success: true,
                message: data
            });
        } else {
            resp.send({
                success: false,
                message: "No orders found for this user."
            });
        }
    } catch (error) {
        resp.status(500).send({
            success: false,
            message: "Internal server error"
        });
    }
};

exports.orderTableget=async (req, resp) => {
    try {
        const data = await order.find();
        if (data.length != 0) {
            resp.send({
                success: true,
                message: data
            });
        } else {
            resp.send({
                success: false,
                message: 0
            });
        }
    } catch (error) {
        console.error(error);
        resp.status(500).send("Internal Server Error");
    }
};
exports.orderupdate=async (req, resp) => {

    const data = await order.updateOne({ name: req.params.order_number },{$set:req.body}); //i->ignore all cases{
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
exports.orderdelete=async (req, resp) => {

    const data = await order.deleteOne({ name: req.params.order_number }); //i->ignore all cases{
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


exports.orderpost=async (req, resp) => {
    const data = new order(req.body);
    const res = await data.save();
    resp.send("Inserted Successfully");
};