/**
 * module description
 * @module LoginController
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
const service = require('./../services/login.service');

/**
 * @file ./../../services/user.service
 */
const userService = require('./../services/user.service');

/**
 * Class definition
 */
class LoginController {
  #entity = 'Log In';

  logIn(req, res) {
    userService.getByEmail(req.body.email).then(foundData => {
      if (foundData.comparePassword(req.body.password)) {
        service.logIn(foundData)
          .then(token => ExceptionManager.acceptedData(res, token))
          .catch(err => ExceptionManager.badRequestData(res,
            `${reqFailedMsj} ${actions.update} ${this.#entity}`, err));
      } else {
        ExceptionManager.badRequestData(res,
          `${reqFailedMsj} ${actions.update} ${this.#entity}`, err);
      }
    }).catch(err => ExceptionManager.badRequestData(res,
      `${reqFailedMsj} ${actions.foundBy} email ${this.#entity}`, err));
  }

  logInGoogleAuth(req, res) {

  }

  renewToken(req, res) {

  }
}

module.exports = new LoginController();