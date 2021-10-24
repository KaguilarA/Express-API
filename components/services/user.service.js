/**
 * module description
 * @module UserService
 */

/**
 * @file ./../../shared/const.manager
 */
const { actions } = require('./../../shared/const.shares');

/**
 * User Model Instance && User Model filtered data schema.
 * @file ./../models/user.models
 */
const { model, modelData } = require('./../models/user.model');
/**
 * Role Model filtered data schema.
 * @file ./../models/role.models
 */
const { modelData: roleData } = require('./../models/role.model');
/**
 * Address Model filtered data schema.
 * @file ./../models/address.models
 */
const { modelData: addressData } = require('./../models/address.model');

/**
 * Class definition
 */
class UserService {

  /**
   * Returns all Users registered.
   * @return {Promise} description
   */
  getAll() {
    return new Promise((resolve, reject) => {
      model.find({state: true}, modelData)
        .populate(`role`, roleData)
        .populate(`address`, addressData)
        .exec((err, foundData) => {
          if (err) {
            reject(err);
          }
          if (!foundData) {
            reject(actions.notFound);
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
        .populate(`role`, roleData)
        .populate(`address`, addressData)
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
   * getById description
   * @param  {String} email description
   * @return {Promise} description
   */
  getByEmail(email) {
    return new Promise((resolve, reject) => {
      model.findOne({ email })
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
   * @param  {Object} newData description
   * @return {Promise} description
   */
  register(newData) {
    return new Promise((resolve, reject) => {
      const newModel = new model(newData);
      newModel.setPassword();
      newModel.save((err, newData) => {
        if (err) {
          reject(err);
        }
        newData
          .populate('role', roleData)
          .populate('address', addressData)
          .execPopulate().then(data => resolve(data));
      });
    });
  }

  /**
   * update description
   * @param  {String} id description
   * @param  {Object} newData description
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
            updated
              .populate('role', roleData)
              .populate('address', addressData)
              .execPopulate().then(data => resolve(data));
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
            updated
              .populate('role', roleData)
              .populate('address', addressData)
              .execPopulate().then(data => {
                resolve(data);
              });
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
            updated
              .populate('role', roleData)
              .populate('address', addressData)
              .execPopulate().then(data => {
                resolve(data);
              });
          });
        });
    });
  }

}

module.exports = new UserService();