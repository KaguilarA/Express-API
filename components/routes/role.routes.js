/**
 * module description
 * @module RoleRoutes
 */

const express = require('express');
const controller = require('./../controllers/role.controller');

const router = express();

router.get('/', (req, res) => controller.getAll(req, res));
router.get('/:id', (req, res) => controller.getById(req, res));
router.post('/', (req, res) => controller.register(req, res));
router.put('/:id', (req, res) => controller.update(req, res));
router.patch('/delete/:id', (req, res) => controller.delete(req, res));
router.patch('/active/:id', (req, res) => controller.activated(req, res));

module.exports = router;