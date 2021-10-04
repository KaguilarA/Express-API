/**
 * module description
 * @module AddressModel
 */

const mongoose = require('mongoose');
const autoIncrement = require('mongoose-auto-increment');

autoIncrement.initialize(mongoose.connection);

const MongooseObj = mongoose.Schema;

const schema = new MongooseObj({
  id: {
    type: Number,
    required: [true, "El id es necesario"],
    default: 0
  },
  province: {
    type: Number,
    required: [true, "La  provincia es requerida"]
  },
  canton: {
    type: Number,
    required: [true, "El cantón es requerido."],
  },
  district: {
    type: Number,
    required: [true, "El distrito es requerido."],
  },
  address: {
    type: String,
    required: [true, "La direccion exacta es requerida."],
  }
});

schema.methods.updateData = function (pNewData) {
  for (const key in pNewData) {
    const currentData = pNewData[key];
    this[key] = currentData;
  }
}

schema.plugin(autoIncrement.plugin, { model: 'Address', field: 'id' });

module.exports = {
  model: mongoose.model('Address', schema, 'Addresses'),
  modelData: 'address canton canton province id -_id'
}