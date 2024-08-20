
const connection = require("./config/db");
const {app} = require("./index")
require("dotenv").config()

app.listen(process.env.port, async () => {
    try {
      await connection;
     console.log("MongoDB is connected")
    } catch (error) {
      console.log(error);
      console.log("DB is not connected");
    }
    console.log(`${process.env.port} is working`);
  });