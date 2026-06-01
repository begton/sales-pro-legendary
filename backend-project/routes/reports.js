const express = require('express');
const pool = require('../db');
const router = express.Router();

router.get('/summary', async (req, res) => {
  try {
    const [[customerCount]] = await pool.query('SELECT COUNT(*) AS totalCustomers FROM Customer');
    const [[productCount]] = await pool.query('SELECT COUNT(*) AS totalProducts FROM Product');
    const [[salesCount]] = await pool.query('SELECT COUNT(*) AS totalSales FROM Sale');
    const [[salesTotal]] = await pool.query('SELECT IFNULL(SUM(totalAmountPaid), 0) AS totalRevenue FROM Sale');

    res.json({
      totalCustomers: customerCount.totalCustomers,
      totalProducts: productCount.totalProducts,
      totalSales: salesCount.totalSales,
      totalRevenue: salesTotal.totalRevenue,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Unable to build summary report' });
  }
});

router.get('/daily', async (req, res) => {
  try {
    const [rows] = await pool.query(
      `SELECT salesDate AS period, COUNT(*) AS salesCount, IFNULL(SUM(totalAmountPaid),0) AS revenue
       FROM Sale
       GROUP BY salesDate
       ORDER BY salesDate DESC
       LIMIT 14`
    );
    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Unable to build daily report' });
  }
});

router.get('/weekly', async (req, res) => {
  try {
    const [rows] = await pool.query(
      `SELECT YEARWEEK(salesDate, 1) AS period, COUNT(*) AS salesCount, IFNULL(SUM(totalAmountPaid),0) AS revenue
       FROM Sale
       GROUP BY YEARWEEK(salesDate, 1)
       ORDER BY period DESC
       LIMIT 12`
    );
    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Unable to build weekly report' });
  }
});

router.get('/monthly', async (req, res) => {
  try {
    const [rows] = await pool.query(
      `SELECT DATE_FORMAT(salesDate, '%Y-%m') AS period, COUNT(*) AS salesCount, IFNULL(SUM(totalAmountPaid),0) AS revenue
       FROM Sale
       GROUP BY DATE_FORMAT(salesDate, '%Y-%m')
       ORDER BY period DESC
       LIMIT 12`
    );
    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Unable to build monthly report' });
  }
});

module.exports = router;
