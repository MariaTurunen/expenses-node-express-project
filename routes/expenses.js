const express = require('express');
const {
  getExpenses,
  getExpenseById,
  updateExpense,
  deleteExpense,
  createExpenseById,
} = require('../controllers/expenses');

const router = express.Router();

router.get('/', getExpenses);
router.get('/:id', getExpenseById);
router.post('/', createExpenseById);
router.put('/', updateExpense);
router.delete('/:id', deleteExpense);

module.exports = router;
