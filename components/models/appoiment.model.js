/**
 * module description
 * @module AppoimentModel
 */

const mongoose = require('mongoose');
const autoIncrement = require('mongoose-auto-increment');

autoIncrement.initialize(mongoose.connection);

const MongooseObj = mongoose.Schema;

const schema = new MongooseObj({
  id: {
    type: Number,
    required: [true, 'El id de la cita es necesario'],
    default: 0
  },
  patient: {
    type: MongooseObj.Types.ObjectId,
    ref: 'User',
    required: [true, 'El pacientede la cita es requerido']
  },
  doctor: {
    type: MongooseObj.Types.ObjectId,
    ref: 'User',
    required: [true, 'El médico de la cita es requerido']
  },
  comments: {
    type: String,
    required: false,
    default: ''
  },
  date: {
    type: Date,
    required: [true, 'La fecha de la cita es requerida']
  },
  state: {
    type: String,
    enum: ['Requested', 'Pending', 'Finished', 'Canceled'],
    required: [true, 'El estado de la cita es requerido'],
    default: 'Requested'
  }
});

schema.methods.updateData = function (pNewData) {
  for (const key in pNewData) {
    const currentData = pNewData[key];
    this[key] = currentData;
  }
}

schema.plugin(autoIncrement.plugin, { model: 'Appoiment', field: 'id' });

module.exports = {
  model: mongoose.model(`Appoiment`, schema, `Appoiments`),
  modelData: 'patient doctor comments date id state -_id'
}