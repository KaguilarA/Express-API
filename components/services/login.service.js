/**
 * module description
 * @module LoginService
 */

/**
 * @file ./../../shared/const.manager
 */
const auth = require('./../../config/auth.config');

/**
 * @file ./../../shared/const.manager
 */
const userService = require('./user.service');

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

  renewToken(req) {
    return new Promise((resolve, reject) => {
      userService.getByIdUnformatted(req.uid)
        .then(foundData => {
          auth.generateToken(foundData)
            .then(token => resolve({ token }))
            .catch(err => reject(err));
        })
        .catch(err => reject(err));
      
    });
  }

}

module.exports = new LoginService();