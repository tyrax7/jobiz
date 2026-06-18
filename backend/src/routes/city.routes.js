const express = require('express');

const cityController = require('../controllers/city.controller');

const router = express.Router();

router.get('/', cityController.getCities);

module.exports = router;