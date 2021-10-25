/**
 * module description
 * @module AilmentService
 */

/**
 * @file ./../models/ailment.models
 */
const { model, modelData } = require('../models/ailment.model');

/**
 * @file ./../../shared/const.manager
 */
const { actions } = require('./../../shared/const.shares');

/**
 * Class definition
 */
class AilmentSevice {

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
          if (!removed) {
            reject(actions.notFound);
          }
          resolve(removed);
        });
    });
  }

  /**
   * Returns all Users registered.
   * @return {Promise} description
   */
  getAll() {
    return new Promise((resolve, reject) => {
      model.find({}, modelData).exec((err, foundData) => {
        if (err) {
          reject(err);
        }
        if (!foundData) {
            reject(actions.notFound);
          }
        model.countDocuments({ state: true }).exec((err, count) => {
          if (err) {
            reject(err);
          }
          resolve({ count, ailments: foundData });
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
      newModel.save((err, registeredData) => {
        if (err) {
          reject(err);
        }
        resolve(registeredData);
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

}

module.exports = new AilmentSevice();