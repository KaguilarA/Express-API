require('dotenv').config();
const mongoose = require('mongoose');
const { colors } = require('./../shared/colors.shared');

module.exports = () => {
  mongoose.set('useCreateIndex', true);
  mongoose.set('useFindAndModify', true)
  mongoose.connect(process.env.DB_URL, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true
  }).then((result) => {
    console.log(`Data Base${colors.yellow}`, 'Connected !');
  }).catch((err) => {
    console.error(`Connection Error ${colors.red}`, err);
  });
}


