const mongoose = require("mongoose");

const { DB_NAME } = require("../constants");
require("dotenv").config();

const ConnectDB = async () => {
  try {
    const Connection = await mongoose.connect(
      `${process.env.MONGO_URL}/${DB_NAME}`
    );
    console.log(
      `\nMongoDB Conected !! DB Host :${Connection.connection.host} `
    );
  } catch (error) {
    console.log("MONGO Connetion Error ", error);
    process.exit(1);
  }
};
module.exports = { ConnectDB };
