const mysql = require('mysql');

let connectionFunctions = {
  connect: (callback) => {},
  close: (callback) => {},
  save: (invoice, callback) => {},
  findAll: (callback) => {},
  deleteById: (id, callback) => {},
  findById: (id, callback) => { },
};

module.exports = connectionFunctions;
