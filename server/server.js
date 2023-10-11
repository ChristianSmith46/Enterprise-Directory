const express = require("express");
const mongoose = require("mongoose");
const router = require("./routes");

const port = process.env.PORT || 3000;
const connectionString = process.env.MONGO_STRING || "mongodb+srv://hackathon:0l7bgp3FPmaZ9DsA@cluster0.nvcnai8.mongodb.net/?retryWrites=true&w=majority";

mongoose.connect(
  connectionString,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

const app = express();

app.use(router)

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
