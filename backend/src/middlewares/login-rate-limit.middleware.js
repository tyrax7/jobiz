const rateLimit = require('express-rate-limit');

const loginRateLimit = rateLimit({
  windowMs: 60 * 1000,
  limit: 3,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    message: 'Trop de tentatives de connexion. Réessayez dans une minute.'
  }
});

module.exports = loginRateLimit;