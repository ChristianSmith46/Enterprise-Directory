const express = require("express");
const mongoose = require("mongoose");
const routes = require("./routes");
const cors = require('cors');

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
app.use(cors());
app.use(express.json());
app.use(express.static('../client/build'));

app.use(routes);

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
