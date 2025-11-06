
require('dotenv').config();
console.log('MONGO_URI from .env:', process.env.MONGO_URI);

const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('./models/userModel');

const dbConnect=require('./config/dbConnect');

dbConnect();

async function seedUsers() {
  const users = [
    { username: 'admin', password: 'admin123', role: 'admin' },
    { username: 'editor', password: 'editor123', role: 'editor' },
    { username: 'viewer', password: 'viewer123', role: 'viewer' },
  ];

  for (let u of users) {
    u.password = await bcrypt.hash(u.password, 10);
    await User.create(u);
  }

  console.log('Seed users created!');
  process.exit();
}

seedUsers();
