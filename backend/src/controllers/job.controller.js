const prisma = require('../config/prisma');

async function getJobs(req, res) {
  try {
    const { search, categoryId, typeId, cityId } = req.query;

    const jobs = await prisma.job.findMany({
      where: {
        AND: [
          search
            ? {
                OR: [
                  { title: { contains: search } },
                  { description: { contains: search } }
                ]
              }
            : {},
          categoryId
            ? {
                categories: {
                  some: {
                    categoryId: Number(categoryId)
                  }
                }
              }
            : {},
          typeId
            ? {
                types: {
                  some: {
                    typeId: Number(typeId)
                  }
                }
              }
            : {},
          cityId
            ? {
                cityId: Number(cityId)
              }
            : {}
        ]
      },
      include: {
        company: true,
        city: true,
        categories: {
          include: {
            category: true
          }
        },
        types: {
          include: {
            type: true
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    });

    return res.status(200).json(jobs);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Erreur serveur.' });
  }
}

async function getJobById(req, res) {
  try {
    const jobId = Number(req.params.id);

    if (Number.isNaN(jobId)) {
      return res.status(400).json({ message: 'Identifiant invalide.' });
    }

    const job = await prisma.job.findUnique({
      where: {
        id: jobId
      },
      include: {
        company: true,
        city: true,
        categories: {
          include: {
            category: true
          }
        },
        types: {
          include: {
            type: true
          }
        }
      }
    });

    if (!job) {
      return res.status(404).json({ message: 'Offre introuvable.' });
    }

    return res.status(200).json(job);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Erreur serveur.' });
  }
}

module.exports = {
  getJobs,
  getJobById
};