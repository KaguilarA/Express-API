/**
 * module description
 * @module EmergencyContactController
 */

/**
 * @file ./../../shared/exception.manager
 */
const ExceptionManager = require('./../../shared/exception.manager');

/**
 * @file ./../../shared/const.manager
 */
const { reqFailedMsj, actions } = require('./../../shared/const.shares');

/**
 * @file ./../../services/emergencyContanct.service
 */
const service = require('./../services/emergencyContanct.service');

/**
 * Class definition
 */
class EmergencyContactController {
  #entity = 'Emergency Contact';

  /**
   * getAll description.
   * @param {Function} req description
   * @param {Function} res description
   */
  getAll(req, res) {
    service.getAll().then(requestResult => {
      ExceptionManager.sendData(res, requestResult);
    }).catch(err => {
      ExceptionManager.sendDataBaseError(res, `${reqFailedMsj} ${actions.getAll} ${this.#entity}s`, err);
    });
  }

  /**
   * getById description.
   * @param {Function} req description
   * @param {Function} res description
   */
  getById(req, res) {
    service.getById(req.params.id).then(requestResult => {
      ExceptionManager.sendData(res, requestResult);
    }).catch(err => {
      ExceptionManager.sendDataBaseError(res,
        `${reqFailedMsj} ${actions.getById} ${this.#entity}`, err);
    });
  }

  /**
   * register description.
   * @param {Function} req description
   * @param {Function} res description
   */
  register(req, res) {
    service.register(req.body).then(requestResult => {
      ExceptionManager.createdData(res, requestResult);
    }).catch(err => {
      ExceptionManager.badRequestData(res, `${reqFailedMsj} ${actions.create} ${this.#entity}`, err);
    });
  }

  /**
   * update description.
   * @param {Function} req description
   * @param {Function} res description
   */
  update(req, res) {
    service.update(req.params.id, req.body).then(requestResult => {
      ExceptionManager.sendData(res, requestResult);
    }).catch(err => {
      ExceptionManager.badRequestData(res, `${reqFailedMsj} ${actions.update} ${this.#entity}`, err);
    });
  }

  /**
   * delete description.
   * @param {Function} req description
   * @param {Function} res description
   */
  delete(req, res) {
    service.delete(req.params.id)
      .then(requestResult => {
        ExceptionManager.sendData(res, requestResult);
      }).catch(err => {
        ExceptionManager.badRequestData(res, `${reqFailedMsj} ${actions.delete} ${this.#entity}`, err);
      });
  }

}

module.exports = new EmergencyContactController();