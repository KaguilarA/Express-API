/**
 * module description
 * @module EmergencyContactModel
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
  firstName: {
    type: String,
    required: [true, `El primer nombre es requerido`]
  },
  secondName: {
    type: String,
    required: false,
    default: ``
  },
  firstSurname: {
    type: String,
    required: [true, `El primer apellido es requerido`]
  },
  secondSurname: {
    type: String,
    required: false,
    default: ``
  },
  email: {
    type: String,
    unique: true,
    required: [true, `El correo electrónico es requerido`]
  },
  phone: {
    type: String,
    required: [true, `El teléfono es requerido`]
  }
});

schema.methods.updateData = function (overwriteData) {
  for (const att in overwriteData) {
    if (Object.hasOwnProperty.call(overwriteData, att)) {
      const newData = overwriteData[att];
      if (this[att] !== undefined) {
        this[att] = newData;
      }
    }
  }
}

schema.plugin(autoIncrement.plugin, { model: 'EmergencyContact', field: 'id' });

module.exports = {
  model: mongoose.model(`EmergencyContact`, schema, `EmergencyContacts`),
  modelData: 'firstName secondName firstSurname secondSurname id email phone -_id'
}