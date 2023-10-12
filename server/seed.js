const { faker } = require("@faker-js/faker");
const mongoose = require("mongoose");
const User = require("./models/User");

let managerIDs = [];

const connectDB = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://hackathon:0l7bgp3FPmaZ9DsA@cluster0.nvcnai8.mongodb.net/?retryWrites=true&w=majority"
    );
    console.log("connected to db");

    const Manager = Array.from({ length: 100 }, createRandomManager);
    const Hr = Array.from({ length: 20 }, createRandomHr);

    // const outputManager = await User.create(Manager);
    // console.log(outputManager);

    // managerIDs = (await User.find({ role: "Manager" })).map((user) =>
    //   user._id.toString()
    // );
    // const USERS = Array.from({ length: 900 }, createRandomUser);

    // const outputUser = await User.create(USERS);
    // console.log(outputUser);
    const outputHr = await User.create(Hr);
    console.log(outputHr);
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
  const cities = [
    "New York City",
    "Los Angeles",
    "Chicago",
    "Houston",
    "Phoenix",
  ];
  const randomCities = Math.floor(Math.random() * cities.length);
  const randomManager = Math.floor(Math.random() * managerIDs.length);
  const salaries = [1.3, 1.6, 1.1, 0.9, 0.7];
  return {
    name: faker.person.fullName(),
    phoneNumber: createRandomPhoneNumber(),
    role: "Employee",
    location: cities[randomCities],
    salary: faker.finance.amount(50000, 100000, 0) * salaries[randomCities],
    email: faker.internet.email(),
    password: faker.internet.password(),
    managerID: managerIDs[randomManager],
  };
}

function createRandomManager() {
  const cities = [
    "New York City",
    "Los Angeles",
    "Chicago",
    "Houston",
    "Phoenix",
  ];
  const randomCities = Math.floor(Math.random() * cities.length);
  const salaries = [1.3, 1.6, 1.1, 0.9, 0.7];
  return {
    name: faker.person.fullName(),
    phoneNumber: createRandomPhoneNumber(),
    role: "Manager",
    location: cities[randomCities],
    salary: faker.finance.amount(100000, 250000, 0) * salaries[randomCities],
    email: faker.internet.email(),
    password: faker.internet.password(),
  };
}

function createRandomHr() {
  const cities = [
    "New York City",
    "Los Angeles",
    "Chicago",
    "Houston",
    "Phoenix",
  ];
  const randomCities = Math.floor(Math.random() * cities.length);
  const salaries = [1.3, 1.6, 1.1, 0.9, 0.7];
  return {
    name: faker.person.fullName(),
    phoneNumber: createRandomPhoneNumber(),
    role: "Hr",
    location: cities[randomCities],
    salary: faker.finance.amount(100000, 150000, 0) * salaries[randomCities],
    email: faker.internet.email(),
    password: faker.internet.password(),
  };
}
