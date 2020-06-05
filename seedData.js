require('dotenv').config();
const mongoose = require('mongoose');
const connect = require('./lib/utils/connect');
const UseOfForce = require('./lib/models/UseOfForce');
const data = require('./UseOfForce-All.json');

connect(process.env.MONGODB_URI);

const seedData = async() => {
  await mongoose.connection.dropDatabase();
  await UseOfForce.create(data);
  await mongoose.connection.close();
};

seedData();
