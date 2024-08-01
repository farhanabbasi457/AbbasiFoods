
const express = require("express");
const cors=require("cors");
const bodyparser=require("body-parser");
const dotenv= require("dotenv");
dotenv.config();
require("./config/config1");

const usersR = require("./routes/usersR");
const categoryR = require("./routes/categoryR");
const discountR = require("./routes/discountR");
const menuitemR = require("./routes/menuitemR");
const orderR = require("./routes/orderR");
const staffR = require("./routes/staffR");


const app = express();

app.use(cors());
// Serve static files from the 'Pictures' directory
app.use(express.static('./public'));
app.use(bodyparser.json());



app.use("/category", categoryR);
app.use("/discount",discountR);
app.use("/menuitem", menuitemR);
app.use("/order", orderR);
app.use("/staff", staffR); 
app.use("/user", usersR);


const port=process.env.PORT;
app.listen(port,()=>{
    console.log(`service running on port ${port}`);
})