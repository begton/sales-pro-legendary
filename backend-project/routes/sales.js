const express = require('express');
const pool = require('../db');
const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const [rows] = await pool.query(
      `SELECT s.*, c.firstName AS customerFirstName, c.lastName AS customerLastName, p.productName
       FROM Sale s
       LEFT JOIN Customer c ON s.customerNumber = c.customerNumber
       LEFT JOIN Product p ON s.productCode = p.productCode
       ORDER BY s.salesDate DESC`
    );
    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Unable to fetch sales' });
  }
});

router.post('/', async (req, res) => {
  try {
    const { invoiceNumber, customerNumber, productCode, salesDate, paymentMethod, quantity, totalAmountPaid } = req.body;
    await pool.query(
      'INSERT INTO Sale (invoiceNumber, customerNumber, productCode, salesDate, paymentMethod, quantity, totalAmountPaid) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [invoiceNumber, customerNumber, productCode, salesDate, paymentMethod, quantity, totalAmountPaid]
    );
    await pool.query('UPDATE Product SET quantitySold = quantitySold + ? WHERE productCode = ?', [quantity, productCode]);
    res.status(201).json({ message: 'Sale recorded successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Unable to record sale' });
  }
});

router.put('/:invoiceNumber', async (req, res) => {
  try {
    const { invoiceNumber } = req.params;
    const { customerNumber, productCode, salesDate, paymentMethod, quantity, totalAmountPaid } = req.body;
    await pool.query(
      'UPDATE Sale SET customerNumber = ?, productCode = ?, salesDate = ?, paymentMethod = ?, quantity = ?, totalAmountPaid = ? WHERE invoiceNumber = ?',
      [customerNumber, productCode, salesDate, paymentMethod, quantity, totalAmountPaid, invoiceNumber]
    );
    res.json({ message: 'Sale updated successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Unable to update sale' });
  }
});

router.delete('/:invoiceNumber', async (req, res) => {
  try {
    const { invoiceNumber } = req.params;
    await pool.query('DELETE FROM Sale WHERE invoiceNumber = ?', [invoiceNumber]);
    res.json({ message: 'Sale deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Unable to delete sale' });
  }
});

module.exports = router;
