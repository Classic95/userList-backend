const mongoose = require('mongoose');

const URI ="mongodb+srv://dbUser:dbUser@thread1.fytsn.mongodb.net/main?retryWrites=true&w=majority";

const connectDB = async () => {
  await mongoose.connect(URI, {
    useUnifiedTopology: true,
    useNewUrlParser: true
  });
  console.log('db connected..!');
};

module.exports = connectDB;
