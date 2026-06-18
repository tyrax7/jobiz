const prisma = require('../config/prisma');

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

async function createContactRequest(req, res) {
  try {
    const { firstName, lastName, email, subject, message, dataConsent } = req.body;

    if (!firstName || !lastName || !email || !subject || !message) {
      return res.status(400).json({
        message: 'Tous les champs sont obligatoires.'
      });
    }

    if (!isValidEmail(email)) {
      return res.status(400).json({
        message: 'Email invalide.'
      });
    }

    if (dataConsent !== true) {
      return res.status(400).json({
        message: 'Le consentement RGPD est obligatoire.'
      });
    }

    const contactRequest = await prisma.contactRequest.create({
      data: {
        firstName,
        lastName,
        email,
        subject,
        message,
        dataConsent
      }
    });

    console.log(`[CONTACT] Nouvelle demande de ${email} : ${subject}`);

    return res.status(201).json({
      message: 'Votre demande de contact a bien été envoyée.',
      contactRequest
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: 'Erreur serveur.'
    });
  }
}

module.exports = {
  createContactRequest
};