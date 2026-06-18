const prisma = require('../config/prisma');

async function createApplication(req, res) {
  try {
    const { jobId, coverLetter } = req.body;
    const userId = req.user.userId;

    if (!jobId || !coverLetter) {
      return res.status(400).json({
        message: 'Offre et lettre de motivation obligatoires.'
      });
    }

    const jobIdNumber = Number(jobId);

    if (Number.isNaN(jobIdNumber)) {
      return res.status(400).json({
        message: 'Identifiant d’offre invalide.'
      });
    }

    const job = await prisma.job.findUnique({
      where: {
        id: jobIdNumber
      }
    });

    if (!job) {
      return res.status(404).json({
        message: 'Offre introuvable.'
      });
    }

    const existingApplication = await prisma.application.findUnique({
      where: {
        userId_jobId: {
          userId,
          jobId: jobIdNumber
        }
      }
    });

    if (existingApplication) {
      return res.status(409).json({
        message: 'Vous avez déjà postulé à cette offre.'
      });
    }

    const application = await prisma.application.create({
      data: {
        userId,
        jobId: jobIdNumber,
        coverLetter,
        status: 'PENDING'
      },
      include: {
        job: {
          include: {
            company: true,
            city: true
          }
        }
      }
    });

    return res.status(201).json({
      message: 'Candidature envoyée avec succès.',
      application
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Erreur serveur.' });
  }
}

async function getMyApplications(req, res) {
  try {
    const userId = req.user.userId;

    const applications = await prisma.application.findMany({
      where: {
        userId
      },
      include: {
        job: {
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
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    });

    return res.status(200).json(applications);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Erreur serveur.' });
  }
}

module.exports = {
  createApplication,
  getMyApplications
};