const Joi = require('joi');
const expenses = require('../models/expenses');

// 'SELECT * FROM money_manager;'
const getExpenses = async (req, res) => {
  try {
    const response = await expenses.findAll();
    if (response) {
      res.send(response);
    }
  } catch (e) {
    res.sendStatus(500);
  }
};
// 'SELECT * FROM money_manager WHERE id=?;'
const getExpenseById = async (req, res) => {
  const id = parseInt(req.params.id, 10);
  try {
    const response = await expenses.findById(id);
    // if id is not number 404 status
    if (response.length === 1) {
      res.send(response[0]);
    } else {
      res.status(404).send('Not Found');
    }
  } catch (e) {
    res.sendStatus(500);
  }
};
// 'INSERT INTO money_manager SET ?;'
const createExpenseById = async (req, res) => {
  // Define the schema
  const schema = Joi.object({
    // amount = number, 1 digit, required
    amount: Joi.number().min(0.01).required(),
    // category = string
    category: Joi.string(),
    // shop = string
    shop: Joi.string(),
  });
  // Validate the req.body against the schema
  // Validate returns an error object if there are validation errors
  const { error } = schema.validate(req.body);
  if (error) {
    // Sending back the error details
    res.status(400).send(error.details[0].message);
    return;
  }

  const expense = {
    amount: req.body.amount,
    category: req.body.category,
    shop: req.body.shop,
  };
  try {
    const response = await expenses.addExpense(expense);
    if (response) {
      expense.id = response.insertId;
      res.status(201).send(expense);
    }
  } catch (e) {
    res.sendStatus(500);
  }
};
// 'UPDATE money_manager SET amount = ?, category = ?, shop = ? WHERE id = ?;'
const updateExpense = async (req, res) => {
  const schema = Joi.object({
    amount: Joi.number(),
    shop: Joi.string(),
    category: Joi.string(),
    id: Joi.number(),
  });
  const { error } = schema.validate(req.body);
  if (error) {
    res.status(400).send(error.details[0].message);
    return;
  }
  const expense = {
    amount: req.body.amount,
    category: req.body.category,
    shop: req.body.shop,
    id: req.body.id,
  };
  try {
    const response = await expenses.updateById(expense);
    if (response.affectedRows === 0) {
      res.status(404).send('Not Found');
      return;
    }
    if (response.affectedRows === 1) {
      res.status(200).send(expense);
    }
  } catch (e) {
    res.sendStatus(500);
  }
};
// 'DELETE FROM money_manager WHERE id=?;'
const deleteExpense = async (req, res) => {
  const id = parseInt(req.params.id, 10);
  try {
    const result = await expenses.deleteById(id);
    if (result.affectedRows === 0) {
      res.status(404).send('Not Found');
      return;
    }
    // result object is returned.
    // const response = await expenses.deleteById(id);
    // query affected one row === expense deleted message
    if (result.affectedRows === 1) {
      res.status(200).send('expense deleted');
    }
  } catch (e) {
    res.sendStatus(500);
  }
};
// 'SELECT * FROM money_manager WHERE category LIKE ?;'
// const getExpenseByCategory = async (req, res) => {
//   const category = parseInt(req.params.category, 10);
//   try {
//     const response = await expenses.findByCategory(category);
//     if (response) {
//       res.send(response);
//     } else {
//       res.status(404).send('Not Found');
//     }
//   } catch (e) {
//     res.sendStatus(500);
//   }
// };

module.exports = {
  getExpenses,
  getExpenseById,
  updateExpense,
  deleteExpense,
  createExpenseById,
};
