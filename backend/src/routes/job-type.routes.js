const express = require('express');

const jobTypeController = require('../controllers/job-type.controller');

const router = express.Router();

router.get('/', jobTypeController.getJobTypes);

module.exports = router;