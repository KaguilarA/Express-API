require('dotenv').config();
const jwt = require('jsonwebtoken');
const { actions } = require('./../shared/const.shares');
const ExceptionManager = require('./../shared/exception.manager');
const userService = require('./../components/services/user.service');

class AuthHelper {

  generateToken({ id: uid }) {
    return new Promise(resolve => {
      jwt.sign({ uid }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES
      }, (err, token) => {
        if (err) {
          reject(err);
        }
        resolve(token);
      });
    });
  }

  validateAdminRole({uid: id}, res, next) {
    userService.getById(id).then(({ role }) => {
      if (role.id !== 0) {
        ExceptionManager.forbiddenRequestData(res, actions.tokenOut);
      }
      next();
    }).catch(err => {
      ExceptionManager.forbiddenRequestData(res, actions.tokenOut);
    });
  }

  validateToken(req, res, next) {
    const token = req.header('x-token');
    if (!token) {
      ExceptionManager.forbiddenRequestData(res, actions.tokenOut);
    }
    jwt.verify(token, process.env.JWT_SECRET, (err, decode) => {
      if (err) {
        ExceptionManager.forbiddenRequestData(res, actions.tokenOut);
      }
      if (decode) {
        req.uid = decode.uid;
      }
      next();
    });
  }

}

module.exports = new AuthHelper();