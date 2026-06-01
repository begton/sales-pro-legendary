const express = require('express');
const pool = require('../db');
const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM Customer ORDER BY customerNumber');
    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Unable to fetch customers' });
  }
});

router.post('/', async (req, res) => {
  try {
    const { customerNumber, firstName, lastName, telephone, address } = req.body;
    await pool.query(
      'INSERT INTO Customer (customerNumber, firstName, lastName, telephone, address) VALUES (?, ?, ?, ?, ?)',
      [customerNumber, firstName, lastName, telephone, address]
    );
    res.status(201).json({ message: 'Customer created successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Unable to create customer' });
  }
});

module.exports = router;
