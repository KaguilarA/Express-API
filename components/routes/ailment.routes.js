/**
 * module description
 * @module AilmentRoutes
 */

const express = require('express');
const auth = require('./../../config/auth.config');
const controller = require('./../controllers/ailment.controller');

const router = express();

router.get('/', auth.validateToken, (req, res) => controller.getAll(req, res));
router.get('/:id', auth.validateToken, (req, res) => controller.getById(req, res));
router.post('/', auth.validateToken, (req, res) => controller.register(req, res));
router.put('/:id', auth.validateToken, (req, res) => controller.update(req, res));
router.delete('/:id', auth.validateToken,(req, res) => controller.delete(req, res));

module.exports = router;