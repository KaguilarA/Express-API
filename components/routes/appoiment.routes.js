/**
 * module description
 * @module AppoimentRoutes
 */

const express = require('express');
const controller = require('./../controllers/appoiment.controller');

const router = express();

router.get('/', (req, res) => controller.getAll(req, res));
router.get('/:id', (req, res) => controller.getById(req, res));
router.post('/', (req, res) => controller.register(req, res));
router.put('/:id', (req, res) => controller.update(req, res));

module.exports = router;