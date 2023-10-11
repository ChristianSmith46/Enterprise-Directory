const { faker } = require("@faker-js/faker");
const mongoose = require("mongoose");
const User = require("./models/User");

const USERS = Array.from({ length: 100 }, createRandomUser);

const connectDB = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://hackathon:0l7bgp3FPmaZ9DsA@cluster0.nvcnai8.mongodb.net/?retryWrites=true&w=majority"
    );
    console.log("connected to db");
    User.create(USERS);
  } catch (error) {
    console.error(error);
  }
};
connectDB();

function createRandomUser() {
  return {
    name: faker.person.fullName(),
    phoneNumber: faker.phone.number(),
    roleID: faker.number.int({ max: 3 }),
    locationID: faker.number.int({ max: 3 }),
    salary: faker.finance.amount(50000, 200000, 0),
    email: faker.internet.email(),
    password: faker.internet.password(),
    managerID: faker.number.int({ max: 3 }),
  };
}

console.log(USERS);

module.exports = USERS;
