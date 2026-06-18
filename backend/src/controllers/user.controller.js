const bcrypt = require('bcrypt');
const prisma = require('../config/prisma');

function removePassword(user) {
  const { password, ...userWithoutPassword } = user;
  return userWithoutPassword;
}

async function updateMe(req, res) {
  try {
    const { firstName, lastName, email, password } = req.body;

    const dataToUpdate = {};

    if (firstName) dataToUpdate.firstName = firstName;
    if (lastName) dataToUpdate.lastName = lastName;
    if (email) dataToUpdate.email = email;

    if (password) {
      dataToUpdate.password = await bcrypt.hash(password, 10);
    }

    const updatedUser = await prisma.user.update({
      where: {
        id: req.user.userId
      },
      data: dataToUpdate
    });

    return res.status(200).json({
      message: 'Profil mis à jour avec succès.',
      user: removePassword(updatedUser)
    });
  } catch (error) {
    if (error.code === 'P2002') {
      return res.status(409).json({ message: 'Cet email est déjà utilisé.' });
    }

    console.error(error);
    return res.status(500).json({ message: 'Erreur serveur.' });
  }
}

async function uploadCv(req, res) {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'Aucun fichier reçu.' });
    }

    const cvPath = req.file.path.replace(/\\/g, '/');

    const updatedUser = await prisma.user.update({
      where: {
        id: req.user.userId
      },
    data: {
        cvPath,
        cvOriginalName: req.file.originalname
    }
    });

    return res.status(200).json({
      message: 'CV uploadé avec succès.',
      user: removePassword(updatedUser)
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Erreur serveur.' });
  }
}

module.exports = {
  updateMe,
  uploadCv
};