/**
 * module description
 * @module AppoimentService
 */

/**
 * Appoiment Model Instance && Appoiment Model filtered data schema.
 * @file ./../models/ailment.models
 */
const { model, modelData } = require('./../models/appoiment.model');
/**
 * User Model filtered data schema.
 * @file ./../models/user.models
 */
const { modelData: userData } = require('./../models/user.model');

/**
 * Class definition
 */
class AppoimentService {

  /**
   * Returns all Users registered.
   * @return {Promise} description
   */
  getAll() {
    return new Promise((resolve, reject) => {
      model.find({}, modelData)
        .populate('patient', userData)
        .populate('doctor', userData)
        .exec((err, foundData) => {
          if (err) {
            reject(err);
          }
          model.countDocuments({state: true}).exec((err, count) => {
            if (err) {
              reject(err);
            }
            resolve({ count, users: foundData });
          });
        });
    });
  }

  /**
   * getById description
   * @param  {String} id description
   * @return {Promise} description
   */
  getById(id) {
    return new Promise((resolve, reject) => {
      model.findOne({ id }, modelData)
        .populate('patient', userData)
        .populate('doctor', userData)
        .exec((err, foundData) => {
          if (err) {
            reject(err);
          }
          resolve(foundData);
        });
    });
  }

  /**
   * register description
   * @param  {Object} newData description
   * @return {Promise} description
   */
  register(newData) {
    return new Promise((resolve, reject) => {
      const newModel = new model(newData);

      newModel.save((err, newData) => {
        if (err) {
          reject(err);
        }
        newData
          .populate('patient', userData)
          .populate('doctor', userData)
          .execPopulate().then(data => resolve(data));
      });
    });
  }

  /**
   * update description
   * @param  {Object} id description
   * @param  {String} newData description
   * @return {Promise} description
   */
  update(id, newData) {
    return new Promise((resolve, reject) => {
      model.findOne({ id })
        .exec((err, foundData) => {
          if (err) {
            reject(err);
          }
          foundData.updateData(newData);
          foundData.save((err, updated) => {
            if (err) {
              reject(err);
            }
            updated
              .populate('patient', userData)
              .populate('doctor', userData)
              .execPopulate().then(data => resolve(data));
          });
        });
    });
  }

}

module.exports = new AppoimentService();