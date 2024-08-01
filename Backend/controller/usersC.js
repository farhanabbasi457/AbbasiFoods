const users=require("../models/users");

exports.userspost=async (req, resp) => {
    const data = new users(req.body);
    const res = await data.save();
    resp.send("Inserted Successfully");
}
exports.usersdelete=async (req, resp) => {
    try {
        const data = await users.deleteMany({email:req.params.email});
        console.log("data",data.deletedCount);
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
    } catch (error) {
        console.error(error);
        resp.status(500).send("Internal Server Error");
    }
}
exports.usersget=async (req, resp) => {
    try {
        const data = await users.find({state:req.params.state});
        console.log(data);
        if (data.length != 0) {
            resp.send({
                success: true,
                message: data
            });
        } else {
            resp.send({
                success: false,
                message: "No User Found"
            });
        }
    } catch (error) {
        console.error(error);
        resp.status(500).send("Internal Server Error");
    }
};
exports.usersTableget=async (req, resp) => {
    try {
        const data = await users.find({});
        console.log(data);
        if (data.length != 0) {
            resp.send({
                success: true,
                message: data
            });
        } else {
            resp.send({
                success: false,
                message: "No User Found"
            });
        }
    } catch (error) {
        console.error(error);
        resp.status(500).send("Internal Server Error");
    }
};
exports.usersUserget=async (req, resp) => {
    try {
        const data = await users.find({role:"user"});
        console.log(data);
        if (data.length != 0) {
            resp.send({
                success: true,
                message: data
            });
        } else {
            resp.send({
                success: false,
                message: "No User Found"
            });
        }
    } catch (error) {
        console.error(error);
        resp.status(500).send("Internal Server Error");
    }
};
exports.usersSingleget=async (req, resp) => {
    try {
        const data = await users.find({name: req.params.name1});
        console.log(data);
        if (data.length != 0) {
            resp.send({
                success: true,
                message: data
            });
        } else {
            resp.send({
                success: false,
                message: "No User Found"
            });
        }
    } catch (error) {
        console.error(error);
        resp.status(500).send("Internal Server Error");
    }
};