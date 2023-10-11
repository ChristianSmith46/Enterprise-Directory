const { faker } = require("@faker-js/faker");

function createRandomUser() {
  return {
    name: faker.person.fullName(),
    phoneNumber: faker.phone.number("555-###-####"),
    roleID: faker.number.int({ max: 3 }),
    locationID: faker.number.int({ max: 3 }),
    salary: faker.finance.amount(50000, 200000, 0),
    email: faker.internet.email(),
    password: faker.internet.password(),
    managerID: faker.number.int({ max: 3 }),
  };
}

const USERS = Array.from({ length: 100 }, createRandomUser);
console.log(USERS);

module.exports = USERS;
