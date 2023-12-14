const mongoose = require('mongoose');

const { Schema, model } = mongoose;

require('dotenv').config();

mongoose.connect('mongodb+srv://Fenrir:test1234@cluster0.niemkxw.mongodb.net/', {
  serverSelectionTimeoutMS: 5000
})
  .then(() => console.log('Connected'))
  .catch(() => {
    console.log("Connection error");
    process.exit()
  });

  const Rooms = new Schema({
    room: String,
    status: String,
  });
  
  const RoomsModel = model('Rooms', Rooms);
  
  module.exports = {
    RoomsModel
  }