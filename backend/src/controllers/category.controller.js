const prisma = require('../config/prisma');

async function getCategories(req, res) {
  try {
    const categories = await prisma.jobCategory.findMany({
      orderBy: {
        name: 'asc'
      }
    });

    return res.status(200).json(categories);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Erreur serveur.' });
  }
}

module.exports = {
  getCategories
};