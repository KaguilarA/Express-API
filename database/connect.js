require('dotenv').config();
const mongoose = require('mongoose');
const colors = require('./../shared/colors.shared');

const solidColors = colors.colors;
const connectionOptions = {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  useCreateIndex: true
}

module.exports = () => {
  mongoose.set('useCreateIndex', true);
  mongoose.set('useFindAndModify', true)
  mongoose.connect(process.env.DB_URL, connectionOptions).then((result) => {
    console.log(`Data Base${solidColors.yellow}`, "Connected !");
  }).catch((err) => {
    console.error(`Connection Error ${solidColors.red}`, err);
  });
}


