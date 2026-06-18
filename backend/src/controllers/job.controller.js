const prisma = require('../config/prisma');

function getTodayStart() {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return today;
}

async function incrementJobViews(jobId) {
  const today = getTodayStart();

  await prisma.jobView.upsert({
    where: {
      jobId
    },
    update: {
      total: {
        increment: 1
      }
    },
    create: {
      jobId,
      total: 1
    }
  });

  await prisma.jobDailyView.upsert({
    where: {
      jobId_day: {
        jobId,
        day: today
      }
    },
    update: {
      views: {
        increment: 1
      }
    },
    create: {
      jobId,
      day: today,
      views: 1
    }
  });
}

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

    await incrementJobViews(jobId);

    return res.status(200).json(job);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Erreur serveur.' });
  }
}

async function getJobViews(req, res) {
  try {
    const jobId = Number(req.params.id);

    if (Number.isNaN(jobId)) {
      return res.status(400).json({ message: 'Identifiant invalide.' });
    }

    const job = await prisma.job.findUnique({
      where: {
        id: jobId
      }
    });

    if (!job) {
      return res.status(404).json({ message: 'Offre introuvable.' });
    }

    const today = getTodayStart();

    const totalViews = await prisma.jobView.findUnique({
      where: {
        jobId
      }
    });

    const todayViews = await prisma.jobDailyView.findUnique({
      where: {
        jobId_day: {
          jobId,
          day: today
        }
      }
    });

    const dailyViews = await prisma.jobDailyView.findMany({
      where: {
        jobId
      },
      orderBy: {
        day: 'desc'
      },
      take: 7
    });

    return res.status(200).json({
      jobId,
      total: totalViews ? totalViews.total : 0,
      today: todayViews ? todayViews.views : 0,
      lastDays: dailyViews
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Erreur serveur.' });
  }
}

module.exports = {
  getJobs,
  getJobById,
  getJobViews
};