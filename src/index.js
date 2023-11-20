const mongoose = require("mongoose");
const { ConnectDB } = require("./db");
require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const cookieParser = require("cookie-parser");

app.use(cors());
app.use(express.json({ limit: "50kb" }));
app.use(express.urlencoded({ limit: "50kb" }));
app.use(express.static("public"));
app.use(cookieParser());

app.get("/", (req, res) => {
  try {
    res.status(200).send({ msg: "Success to get the data" });
  } catch (error) {
    res.status(400).send({ msg: "Error while geting the data.", error });
  }
});

app.listen(process.env.PORT || 8080, async () => {
  try {
    await ConnectDB();
    console.log("Connected App ");
  } catch (error) {
    console.log("Connection Error on Express App ", error);
  }
});
