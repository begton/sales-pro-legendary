const express = require('express');
const pool = require('../db');
const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM Product ORDER BY productCode');
    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Unable to fetch products' });
  }
});

router.post('/', async (req, res) => {
  try {
    const { productCode, productName, quantitySold, unitPrice } = req.body;
    await pool.query(
      'INSERT INTO Product (productCode, productName, quantitySold, unitPrice) VALUES (?, ?, ?, ?)',
      [productCode, productName, quantitySold, unitPrice]
    );
    res.status(201).json({ message: 'Product created successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Unable to create product' });
  }
});

module.exports = router;
