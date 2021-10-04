/**
 * module description
 * @module RoleModel
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
  authentication: {
    type: [String],
    default: []
  },
  state: {
    type: Boolean,
    enum: [true, false],
    required: [true, "El estado es requerido."],
    default: true
  }
});

schema.methods.updateData = function (pNewRoleData) {
  for (const key in pNewRoleData) {
    const currentData = pNewRoleData[key];
    this[key] = currentData;
  }
}

schema.methods.setState = function (newState) {
  this.state = newState;
}

schema.methods.addAuth = function (pNewAuth) {
  this.authentication.push(pNewAuth);
}

schema.plugin(autoIncrement.plugin, {
  model: 'Role',
  field: 'id'
});

module.exports = {
  model: mongoose.model('Role', schema, 'Roles'),
  modelData: 'id name state authentication -_id'
}