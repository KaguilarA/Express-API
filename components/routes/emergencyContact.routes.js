/**
 * module description
 * @module EmergencyContactRoutes
 */

const express = require('express');
const controller = require('./../controllers/emergencyContact.controller');

const router = express();

router.get('/', (req, res) => controller.getAll(req, res));
router.get('/:id', (req, res) => controller.getById(req, res));
router.post('/', (req, res) => controller.register(req, res));
router.put('/:id', (req, res) => controller.update(req, res));
router.delete('/:id',(req, res) => controller.delete(req, res));

module.exports = router;