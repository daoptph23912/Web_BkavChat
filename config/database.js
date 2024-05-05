const mongoose = require("mongoose");
require("dotenv").config();
module.exports.connect = () => {
  mongoose.connect(process.env.URL).then(() => console.log("Connected!"));
};
