const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/afaexpress', {
    host: "localhost",
    user: "root",
    password: "",
    database: "afaexpress",
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

module.exports = db;
