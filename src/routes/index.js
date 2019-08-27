const { Router } = require('express');
const serverRoutes = require('./server');

const router = Router();

router.use('/server', serverRoutes);

module.exports = router;
