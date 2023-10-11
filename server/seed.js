const { faker } = require("@faker-js/faker");
const mongoose = require("mongoose");
const User = require("./models/User");

const USERS = Array.from({ length: 100 }, createRandomUser);

const Manager = Array.from({ length: 10 }, createRandomManager);

const connectDB = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://hackathon:0l7bgp3FPmaZ9DsA@cluster0.nvcnai8.mongodb.net/?retryWrites=true&w=majority"
    );
    console.log("connected to db");
    const outputManager = await User.create(Manager);
    console.log(outputManager);
    const outputUser = await User.create(USERS);
  } catch (error) {
    console.error(error);
  }
};
connectDB();

function createRandomPhoneNumber() {
  const areaCode = faker.number.int({ min: 100, max: 999 });
  const prefix = faker.number.int({ min: 100, max: 999 });
  const lineNumber = faker.number.int({ min: 1000, max: 9999 });

  return `${areaCode}-${prefix}-${lineNumber}`;
}

function createRandomUser() {
  return {
    name: faker.person.fullName(),
    phoneNumber: createRandomPhoneNumber(),
    roleID: faker.number.int({ max: 3 }),
    locationID: faker.number.int({ max: 3 }),
    salary: faker.finance.amount(50000, 100000, 0),
    email: faker.internet.email(),
    password: faker.internet.password(),
    managerID: faker.number.int({ max: 3 }),
  };
}

function createRandomManager() {
  return {
    name: faker.person.fullName(),
    phoneNumber: createRandomPhoneNumber(),
    roleID: 1,
    locationID: faker.number.int({ max: 3 }),
    salary: faker.finance.amount(100000, 250000, 0),
    email: faker.internet.email(),
    password: faker.internet.password(),
  };
}

// console.log(Manager);

module.exports = USERS;
