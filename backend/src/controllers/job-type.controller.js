const prisma = require('../config/prisma');

async function getJobTypes(req, res) {
  try {
    const jobTypes = await prisma.jobType.findMany({
      orderBy: {
        name: 'asc'
      }
    });

    return res.status(200).json(jobTypes);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Erreur serveur.' });
  }
}

module.exports = {
  getJobTypes
};