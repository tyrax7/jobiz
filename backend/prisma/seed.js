const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');

const prisma = new PrismaClient();

async function main() {
  const passwordHash = await bcrypt.hash('Password123!', 10);

  const admin = await prisma.user.upsert({
    where: { email: 'admin@jobiz.test' },
    update: {},
    create: {
      firstName: 'Admin',
      lastName: 'Jobiz',
      email: 'admin@jobiz.test',
      password: passwordHash,
      role: 'ADMIN'
    }
  });

  const candidate = await prisma.user.upsert({
    where: { email: 'candidat@jobiz.test' },
    update: {},
    create: {
      firstName: 'Alex',
      lastName: 'Martin',
      email: 'candidat@jobiz.test',
      password: passwordHash,
      role: 'USER'
    }
  });

  const montpellier = await prisma.city.upsert({
    where: { id: 1 },
    update: {},
    create: {
      name: 'Montpellier',
      postalCode: '34000'
    }
  });

  const paris = await prisma.city.upsert({
    where: { id: 2 },
    update: {},
    create: {
      name: 'Paris',
      postalCode: '75000'
    }
  });

  const lyon = await prisma.city.upsert({
    where: { id: 3 },
    update: {},
    create: {
      name: 'Lyon',
      postalCode: '69000'
    }
  });

  const toulouse = await prisma.city.upsert({
    where: { id: 4 },
    update: {},
    create: {
      name: 'Toulouse',
      postalCode: '31000'
    }
  });

  const devWeb = await prisma.jobCategory.upsert({
    where: { name: 'Développement Web' },
    update: {},
    create: { name: 'Développement Web' }
  });

  const adminSystem = await prisma.jobCategory.upsert({
    where: { name: 'Administration Système' },
    update: {},
    create: { name: 'Administration Système' }
  });

  const network = await prisma.jobCategory.upsert({
    where: { name: 'Réseau' },
    update: {},
    create: { name: 'Réseau' }
  });

  const cybersecurity = await prisma.jobCategory.upsert({
    where: { name: 'Cybersécurité' },
    update: {},
    create: { name: 'Cybersécurité' }
  });

  const cdi = await prisma.jobType.upsert({
    where: { name: 'CDI' },
    update: {},
    create: { name: 'CDI' }
  });

  const cdd = await prisma.jobType.upsert({
    where: { name: 'CDD' },
    update: {},
    create: { name: 'CDD' }
  });

  const internship = await prisma.jobType.upsert({
    where: { name: 'Stage' },
    update: {},
    create: { name: 'Stage' }
  });

  const apprenticeship = await prisma.jobType.upsert({
    where: { name: 'Alternance' },
    update: {},
    create: { name: 'Alternance' }
  });

  const freelance = await prisma.jobType.upsert({
    where: { name: 'Freelance' },
    update: {},
    create: { name: 'Freelance' }
  });

  const techNova = await prisma.company.create({
    data: {
      name: 'TechNova',
      description: 'Entreprise spécialisée dans le développement d’applications web.',
      address: '12 rue des Développeurs',
      cityId: montpellier.id
    }
  });

  const cyberSafe = await prisma.company.create({
    data: {
      name: 'CyberSafe',
      description: 'Société fictive spécialisée dans la sécurité informatique.',
      address: '8 avenue de la Sécurité',
      cityId: paris.id
    }
  });

  const cloudLink = await prisma.company.create({
    data: {
      name: 'CloudLink',
      description: 'Entreprise spécialisée dans les infrastructures cloud et réseau.',
      address: '25 boulevard du Cloud',
      cityId: lyon.id
    }
  });

  await prisma.job.create({
    data: {
      title: 'Développeur Web Junior',
      description: 'Participation au développement d’une application web avec Angular et Node.js.',
      remoteAllowed: true,
      salaryMin: 28000,
      salaryMax: 34000,
      companyId: techNova.id,
      cityId: montpellier.id,
      categories: {
        create: [
          { categoryId: devWeb.id }
        ]
      },
      types: {
        create: [
          { typeId: cdi.id }
        ]
      }
    }
  });

  await prisma.job.create({
    data: {
      title: 'Technicien Systèmes et Réseaux',
      description: 'Maintenance des postes, support utilisateurs et administration de serveurs.',
      remoteAllowed: false,
      salaryMin: 26000,
      salaryMax: 32000,
      companyId: cloudLink.id,
      cityId: lyon.id,
      categories: {
        create: [
          { categoryId: adminSystem.id },
          { categoryId: network.id }
        ]
      },
      types: {
        create: [
          { typeId: cdd.id }
        ]
      }
    }
  });

  await prisma.job.create({
    data: {
      title: 'Assistant Cybersécurité',
      description: 'Aide à la surveillance sécurité, analyse de logs et sensibilisation des utilisateurs.',
      remoteAllowed: true,
      salaryMin: 0,
      salaryMax: 0,
      companyId: cyberSafe.id,
      cityId: paris.id,
      categories: {
        create: [
          { categoryId: cybersecurity.id },
          { categoryId: network.id }
        ]
      },
      types: {
        create: [
          { typeId: apprenticeship.id },
          { typeId: internship.id }
        ]
      }
    }
  });

  await prisma.job.create({
    data: {
      title: 'Développeur Frontend Freelance',
      description: 'Création d’interfaces Angular pour une plateforme de recrutement.',
      remoteAllowed: true,
      salaryMin: 300,
      salaryMax: 450,
      companyId: techNova.id,
      cityId: toulouse.id,
      categories: {
        create: [
          { categoryId: devWeb.id }
        ]
      },
      types: {
        create: [
          { typeId: freelance.id }
        ]
      }
    }
  });

  console.log('Seed terminé avec succès.');
  console.log(`Admin créé : ${admin.email}`);
  console.log(`Candidat créé : ${candidate.email}`);
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });