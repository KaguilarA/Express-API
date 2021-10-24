/**
 * module description
 * @module RoleService
 */

/**
 * @file ./../../shared/const.manager
 */
const { actions } = require('./../../shared/const.shares');

/**
 * Role Model Instance && Role Model filtered data schema.
 * @file ./../models/role.models
 */
const { model, modelData } = require('./../models/role.model');

/**
 * Class definition
 */
class RoleService {

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
            resolve({ count, roles: foundData });
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
        if (!foundData) {
            reject(actions.notFound);
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
   * activate description
   * @param  {String} id description
   * @return {Promise} description
   */
  activate(id) {
    return new Promise((resolve, reject) => {
      model.findOne({ id })
        .exec((err, foundData) => {
          if (err) {
            reject(err);
          }
          if (!foundData) {
            reject(actions.notFound);
          }
          foundData.setState(true);
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
      model.findOne({ id })
        .exec((err, foundData) => {
          if (err) {
            reject(err);
          }
          if (!foundData) {
            reject(actions.notFound);
          }
          foundData.setState(false);
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

module.exports = new RoleService();