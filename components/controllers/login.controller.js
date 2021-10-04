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
const { reqFailedMsj } = require('./../../shared/const.shares');

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
}

module.exports = new LoginController();