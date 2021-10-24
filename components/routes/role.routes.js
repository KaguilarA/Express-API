/**
 * module description
 * @module RoleRoutes
 */

const express = require('express');
const auth = require('./../../config/auth.config');
const controller = require('./../controllers/role.controller');

const router = express();

router.get('/', [auth.validateToken, auth.validateAdminRole], (req, res) => controller.getAll(req, res));
router.get('/:id', [auth.validateToken, auth.validateAdminRole], (req, res) => controller.getById(req, res));
router.post('/', [auth.validateToken, auth.validateAdminRole], (req, res) => controller.register(req, res));
router.put('/:id', [auth.validateToken, auth.validateAdminRole], (req, res) => controller.update(req, res));
router.patch('/delete/:id', [auth.validateToken, auth.validateAdminRole], (req, res) => controller.delete(req, res));
router.patch('/active/:id', [auth.validateToken, auth.validateAdminRole], (req, res) => controller.activated(req, res));

module.exports = router;