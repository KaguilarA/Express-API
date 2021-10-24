/**
 * module description
 * @module TreatmentService
 */

/**
 * @file ./../../shared/const.manager
 */
const { actions } = require('./../../shared/const.shares');

/**
 * @file ./../models/ailment.models
 */
const { model, modelData } = require('./../models/treatment.model');

/**
 * Class definition
 */
class TreatmentSevice {

  /**
   * Returns all Role registered.
   * @return {Promise} description
   */
  getAll() {
    return new Promise((resolve, reject) => {
      model.find({}, modelData)
        .exec((err, foundData) => {
          if (err) {
            reject(err);
          }
          if (!foundData) {
            reject(actions.notFound);
          }
          model.countDocuments({}).exec((err, count) => {
            if (err) {
              reject(err);
            }
            resolve({ count, addresses: foundData });
          });
        });
    });
  }

  /**
   * getById description
   * @param  {Object} id description
   * @return {Promise} description
   */
  getById(id) {
    return new Promise((resolve, reject) => {
      model.findOne({ id }, modelData)
        .exec((err, foundData) => {
          if (err) {
            reject(err);
          }
          if (!foundData) {
            reject(actions.notFound);
          }
          resolve(foundData);
        });
    });
  }

  /**
   * register description
   * @param  {String} newData description
   * @return {Promise} description
   */
  register(newData) {
    return new Promise((resolve, reject) => {
      const newModel = new model(newData);
      newModel.save((err, address) => {
        if (err) {
          reject(err);
        }
        resolve(address);
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
          if (!foundData) {
            reject(actions.notFound);
          }
          foundData.updateData(newData);
          foundData.save((err, updated) => {
            if (err) {
              reject(err);
            }
            resolve(updated);
          });
        });
    });
  }

  /**
   * delete description
   * @param  {String} id description
   * @return {Promise} description
   */
  delete(id) {
    return new Promise((resolve, reject) => {
      model.findOneAndDelete({ id })
        .exec((err, removed) => {
          if (err) {
            reject(err);
          }
          if (!foundData) {
            reject(actions.notFound);
          }
          resolve(removed);
        });
    });
  }

}

module.exports = new TreatmentSevice();