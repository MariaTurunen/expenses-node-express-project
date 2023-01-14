const connection = require('../database/connection');

const expenses = {
  findAll: () => new Promise((resolve, reject) => {
    connection.query('SELECT * FROM money_manager;', (err, result) => {
      if (err) {
        reject(err);
      }
      resolve(result);
    });
  }),
  findById: (id) => new Promise((resolve, reject) => {
    const selectQuery = 'SELECT * FROM money_manager WHERE id = ?;';
    connection.query(selectQuery, id, (err, result) => {
      if (err) {
        reject(err);
      }
      resolve(result);
    });
  }),
  addExpense: (expense) => new Promise((resolve, reject) => {
    connection.query('INSERT INTO money_manager SET ?', expense, (err, result) => {
      if (err) {
        reject(err);
      }
      resolve(result);
    });
  }),
  updateById: (expense) => new Promise((resolve, reject) => {
    const updateQuery = 'UPDATE money_manager SET amount = ?, category = ?, shop = ? WHERE id = ?';
    // eslint-disable-next-line max-len
    connection.query(updateQuery, [expense.amount, expense.category, expense.shop, expense.id], (err, result) => {
      if (err) {
        reject(err);
      }
      resolve(result);
    });
  }),
  deleteById: (id) => new Promise((resolve, reject) => {
    const deleteQuery = 'DELETE FROM money_manager WHERE id = ?;';
    connection.query(deleteQuery, id, (err, result) => {
      if (err) {
        reject(err);
      }
      resolve(result);
    });
  }),
};
module.exports = expenses;
