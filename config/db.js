const mongoose = require("mongoose");
require("dotenv").config({ path: "variables.env" });

const conectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false
    });
    console.log("db conected!");
  } catch (error) {
    console.log(error);
    process.exit(1); //con esto detenemos el proceso principal de node
  }
};

module.exports = conectDB;
