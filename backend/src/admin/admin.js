const bcrypt = require('bcrypt');
const prisma = require('../config/prisma');

async function setupAdmin(app) {
  const AdminJS = (await import('adminjs')).default;
  const AdminJSExpress = await import('@adminjs/express');
  const { Adapter, Resource, Database } = await import('@adminjs/sql');

  AdminJS.registerAdapter({
    Database,
    Resource
  });

const db = await new Adapter('mysql2', {
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT || 3306),
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
}).init();

  const admin = new AdminJS({
    rootPath: '/admin',
    resources: [
      {
        resource: db.table('users'),
        options: {
          properties: {
            password: {
              isVisible: {
                list: false,
                filter: false,
                show: false,
                edit: false
              }
            }
          }
        }
      },
      db.table('companies'),
      db.table('cities'),
      db.table('jobs'),
      db.table('job_categories'),
      db.table('job_types'),
      db.table('applications'),
      db.table('contact_requests'),
      db.table('job_views'),
      db.table('job_daily_views')
    ],
    branding: {
      companyName: 'Jobiz Admin',
      softwareBrothers: false
    }
  });

  const adminRouter = AdminJSExpress.buildAuthenticatedRouter(
    admin,
    {
      authenticate: async (email, password) => {
        const user = await prisma.user.findUnique({
          where: { email }
        });

        if (!user || user.role !== 'ADMIN') {
          return null;
        }

        const passwordIsValid = await bcrypt.compare(password, user.password);

        if (!passwordIsValid) {
          return null;
        }

        return {
          email: user.email,
          role: user.role
        };
      },
      cookieName: 'jobiz_admin',
      cookiePassword: process.env.ADMIN_COOKIE_SECRET
    },
    null,
    {
      resave: false,
      saveUninitialized: false,
      secret: process.env.ADMIN_COOKIE_SECRET
    }
  );

  app.use(admin.options.rootPath, adminRouter);
}

module.exports = setupAdmin;