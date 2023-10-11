const express = require("express");
const mongoose = require("mongoose");

const port = 3000;

mongoose.connect(
  "mongodb+srv://hackathon:0l7bgp3FPmaZ9DsA@cluster0.nvcnai8.mongodb.net/?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

const app = express();

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
