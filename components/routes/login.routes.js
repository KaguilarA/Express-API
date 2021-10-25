/**
 * module description
 * @module LoginRoutes
 */

const express = require('express');
const auth = require('./../../config/auth.config');
const controller = require('./../controllers/login.controller');
const router = express();

router.post('/', (req, res) => controller.logIn(req, res));
router.post('/google', (req, res) => controller.logInGoogleAuth(req, res));
router.get('/renew', auth.validateToken,
  (req, res) => controller.renewToken(req, res));

module.exports = router;