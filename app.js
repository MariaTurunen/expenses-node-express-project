// use express framework
const express = require('express');
// Use router
const expensesRouter = require('./routes/expenses');

const app = express();
app.use(express.json());
// use controller
app.use('/api/expenses', expensesRouter);

module.exports = app;
