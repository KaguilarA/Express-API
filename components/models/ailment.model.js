/**
 * module description
 * @module AilmentModel
 */

const mongoose = require('mongoose');
const autoIncrement = require('mongoose-auto-increment');

autoIncrement.initialize(mongoose.connection);

const MongooseObj = mongoose.Schema;

const schema = new MongooseObj({
  id: {
    type: Number,
    required: [true, 'El id es necesario'],
    default: 0
  },
  name: {
    type: String,
    required: [true, 'El nombre es requerido']
  },
  description: {
    type: String,
    required: [true, 'La descripción es requerida']
  },
  registerDate: {
    type: Date,
    required: [true, 'La fecha de registro es requerida']
  }
});

schema.methods.updateData = function (pNewData) {
  for (const key in pNewData) {
    const currentData = pNewData[key];
    this[key] = currentData;
  }
}

schema.plugin(autoIncrement.plugin, { model: 'Ailment', field: 'id' });

module.exports = {
  model: mongoose.model('Ailment', schema, 'Ailments'),
  modelData: 'id name description registerDate -_id'
}