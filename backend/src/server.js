require('dotenv').config();

const express = require('express');
const cors = require('cors');
const helmet = require('helmet');

const authRoutes = require('./routes/auth.routes');
const jobRoutes = require('./routes/job.routes');
const categoryRoutes = require('./routes/category.routes');
const jobTypeRoutes = require('./routes/job-type.routes');
const companyRoutes = require('./routes/company.routes');
const cityRoutes = require('./routes/city.routes');
const userRoutes = require('./routes/user.routes');

const app = express();

const PORT = process.env.PORT || 3000;
const FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:4200';

app.use(helmet());
app.use(cors({
  origin: FRONTEND_URL,
  credentials: true
}));
app.use(express.json());

app.get('/api/health', (req, res) => {
  res.status(200).json({
    status: 'ok',
    service: 'jobiz-api'
  });
});

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/jobs', jobRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/job-types', jobTypeRoutes);
app.use('/api/companies', companyRoutes);
app.use('/api/cities', cityRoutes);


app.use((error, req, res, next) => {
  if (error.code === 'LIMIT_FILE_SIZE') {
    return res.status(400).json({ message: 'Le fichier ne doit pas dépasser 5 Mo.' });
  }

  if (error.message === 'Seuls les fichiers PDF sont autorisés.') {
    return res.status(400).json({ message: error.message });
  }

  return res.status(500).json({ message: 'Erreur serveur.' });
});


app.listen(PORT, () => {
  console.log(`API Jobiz lancee sur http://localhost:${PORT}`);
});