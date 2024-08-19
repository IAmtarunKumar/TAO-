const express = require("express");
require("dotenv").config();
const cors = require("cors")
const connection = require("./config/db");
const userRouter = require("./routes/userRoute");
const postRouter = require("./routes/postRoute");
const commentRouter = require("./routes/commentRoute");


const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  res.send("welcome");
});

app.use(cors())

app.use("/user", userRouter);
app.use("/post", postRouter);
app.use("/" , commentRouter)

app.listen(process.env.port, async () => {
  try {
    await connection;
    console.log(`${process.env.port} is working`);
  } catch (error) {
    console.log(error);
    console.log("DB is not connected");
  }
});


