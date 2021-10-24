require('dotenv').config();
const jwt = require('jsonwebtoken');
const { actions } = require('./../shared/const.shares');
const ExceptionManager = require('./../shared/exception.manager');
const userService = require('./../components/services/user.service')

class AuthHelper {

  generateToken({ id: payload }) {
    return new Promise(resolve => {
      jwt.sign({ payload }, process.env.JWT_SECRET, {
        expiresIn: '12h'
      }, (err, token) => {
        if (err) {
          reject(err);
        } else {
          resolve(token);
        }
      });
    });
  }

  validateAdminRole({ uid: id }, res, next) {
    // userService.getById({ id }).then(res => {
    //   console.log('AuthHelper: ', res);
    //   next();
    // }).catch(err => {
    //   ExceptionManager.forbiddenRequestData(res, actions.tokenOut);
    //   next();
    // });

    next();
  }

  validateToken(req, res, next) {
    const token = req.header('x-token');
    // if (!token) {
    //   ExceptionManager.forbiddenRequestData(res, actions.tokenOut);
    //   next();
    // }
    // jwt.verify(token, process.env.JWT_SECRET, (err, decode) => {
    //   next();
    // });
    next();
    
  }

}

module.exports = new AuthHelper();