const prisma = require('../config/prisma');

async function getCities(req, res) {
  try {
    const cities = await prisma.city.findMany({
      orderBy: {
        name: 'asc'
      }
    });

    return res.status(200).json(cities);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Erreur serveur.' });
  }
}

module.exports = {
  getCities
};