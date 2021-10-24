/**
 * module description
 * @module LoginService
 */

/**
 * @file ./../../shared/const.manager
 */
const auth = require('./../../config/auth.config');

/**
 * Class definition
 */
class LoginService {

  logIn(userAuth) {
    return new Promise((resolve, reject) => {
      auth.generateToken(userAuth)
        .then(token => resolve({ token }))
        .catch(err => reject(err));
    });
  }
}

module.exports = new LoginService();