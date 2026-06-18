const express = require('express');

const authMiddleware = require('../middlewares/auth.middleware');
const uploadCvMiddleware = require('../middlewares/upload-cv.middleware');
const userController = require('../controllers/user.controller');

const router = express.Router();

router.put('/me', authMiddleware, userController.updateMe);

router.post(
  '/me/cv',
  authMiddleware,
  uploadCvMiddleware.single('cv'),
  userController.uploadCv
);

module.exports = router;