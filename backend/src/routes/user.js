const express = require('express');
const router = express.Router();
const User = require('../models/User');

// GET /api/users
router.get('/', async (req, res) => {
  try {
    const { name, email } = req.query;

    let query = {};
    if (name) {
      query.name = { $regex: name, $options: 'i' };
    }
    if (email) {
      query.email = { $regex: email, $options: 'i' };
    }

    const users = await User.find(query).select('-password');
    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Error al obtener usuarios' });
  }
});

module.exports = router;