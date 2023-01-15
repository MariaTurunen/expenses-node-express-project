// use express framework
const express = require('express');
const cors = require('cors');
// Use router
const expensesRouter = require('./routes/expenses');

const app = express();
app.use(express.json());
app.use(cors({ origin: ['http://localhost:5000', 'https://expenses-node-express-api.onrender.com'] }));
// use controller
app.use('/api/expenses', expensesRouter);

module.exports = app;
