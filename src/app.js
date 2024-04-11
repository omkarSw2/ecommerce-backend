const express = require("express");
const app = express();
const cors = require("cors");
const cookieParser = require("cookie-parser");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded());
app.use(express.static("public"));
app.use(cookieParser());

app.get("/", (req, res) => {
  try {
    res.status(200).send({ msg: "Success to get the data01" });
  } catch (error) {
    res.status(400).send({ msg: "Error while geting the data.", error });
  }
});

//routes import
const { UserRouter } = require("./routes/user.Routes");

// Routes Declaration
app.use("/api/v1/users", UserRouter);

module.exports = { app };
