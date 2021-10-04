/**
 * module description
 * @module UserModel
 */

const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const uniqueValidator = require('mongoose-unique-validator');
const autoIncrement = require('mongoose-auto-increment');

mongoose.set('toJSON', { virtuals: true });
autoIncrement.initialize(mongoose.connection);

const MongooseObj = mongoose.Schema;

const schema = new MongooseObj({
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
  dbId: {
    type: String,
    required: [true, `La identificación es requerida`],
    default: ``
  },
  id: {
    type: String,
    required: [true, `La identificación es requerida`],
    default: ``
  },
  idType: {
    type: String,
    required: [true, `El tipo de identificación es requerido`],
    default: ``
  },
  email: {
    type: String,
    unique: true,
    required: [true, `El correo electrónico es requerido`]
  },
  password: {
    type: String,
    required: [true, `La contraseña es requerida`]
  },
  img: {
    type: String,
    required: false,
    default: 'https://res.cloudinary.com/thiamine/image/upload/v1611333689/adminPro/no-img.jpg'
  },
  phone: {
    type: String,
    required: [true, `El teléfono es requerido`]
  },
  state: {
    type: Boolean,
    required: [true, `El estado es requerido`],
    default: true
  },
  birthdate: {
    type: Date,
    required: [true, `La fecha de nacimiento es requerida`]
  },
  googleTokenLogin: {
    type: Boolean,
    required: true,
    default: false
  },
  role: {
    type: MongooseObj.Types.ObjectId,
    ref: `Role`
  },
  address: {
    type: MongooseObj.Types.ObjectId,
    ref: `Address`
  },
});

schema.virtual('fullName').get(function () {
  return `${this.firstName} ${this.firstSurname}`;
});

schema.methods.comparePassword = function (pPwToValidate) {
  return bcrypt.compareSync(pPwToValidate, this.password);
}

schema.methods.setGoogleLogin = function () {
  this.googleTokenLogin = true;
}

schema.methods.setPassword = function () {
  this.password = bcrypt.hashSync(this.password);
}

schema.methods.setState = function (newState) {
  this.state = newState;
}

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

schema.methods.updateImage = function (img) {
  this.img = img;
}

schema.plugin(uniqueValidator, {
  message: `El correo electrónico ya esta registrado.`
});

schema.plugin(autoIncrement.plugin, {
  model: 'User',
  field: 'dbId'
});

module.exports = {
  model: mongoose.model(`User`, schema, `Users`),
  modelData: 'firstName secondName firstSurname secondSurname dbId id idType email img phone birthdate googleTokenLogin state -_id'
}