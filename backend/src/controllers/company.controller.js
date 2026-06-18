const prisma = require('../config/prisma');

async function getCompanies(req, res) {
  try {
    const companies = await prisma.company.findMany({
      include: {
        city: true
      },
      orderBy: {
        name: 'asc'
      }
    });

    return res.status(200).json(companies);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Erreur serveur.' });
  }
}

module.exports = {
  getCompanies
};