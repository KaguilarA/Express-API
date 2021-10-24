/**
 * module description
 * @module ComponentsRoutes
 */

const express = require('express');

const addressRoutes = require('./routes/address.routes');
const ailmentRoutes = require('./routes/ailment.routes');
const appoimentRoutes = require('./routes/appoiment.routes');
const emergencyContactRoutes = require('./routes/emergencyContact.routes');
const loginRoutes = require('./routes/login.routes');
const roleRoutes = require('./routes/role.routes');
const treatmentRoutes = require('./routes/treatment.routes');
const userRoutes = require('./routes/user.routes');

const router = express();

router.use('/address', addressRoutes);
router.use('/ailment', ailmentRoutes);
router.use('/appoiment', appoimentRoutes);
router.use('/emergencyContact', emergencyContactRoutes);
router.use('/login', loginRoutes);
router.use('/role', roleRoutes);
router.use('/treatment', treatmentRoutes);
router.use('/user', userRoutes);

module.exports = router;