/**
 * module description
 * @module TreatmentModel
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
  name: {
    type: String,
    required: [true, "El nombre es requerido"]
  },
  description: {
    type: String,
    required: [true, "La descripción es requerida"]
  },
  instrunctions: {
    type: String,
    required: [true, "Las indicaciones es requerida"]
  },
  initialDate: {
    type: Date,
    required: [true, "La fecha de inicio es requerida"]
  },
  doneDate: {
    type: Date,
    required: [true, "La fecha de finalización es requerida"]
  }
});

schema.methods.updateData = function (pNewData) {
  for (const key in pNewData) {
    const currentData = pNewData[key];
    this[key] = currentData;
  }
}

schema.plugin(autoIncrement.plugin, { model: 'Treatment', field: 'id' });

module.exports = {
  model: mongoose.model('Treatment', schema, 'Treatments'),
  modelData: 'id name description instrunctions initialDate doneDate -_id'
}