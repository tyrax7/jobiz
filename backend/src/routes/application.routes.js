const express = require('express');

const authMiddleware = require('../middlewares/auth.middleware');
const applicationController = require('../controllers/application.controller');

const router = express.Router();

router.post('/', authMiddleware, applicationController.createApplication);
router.get('/me', authMiddleware, applicationController.getMyApplications);

module.exports = router;