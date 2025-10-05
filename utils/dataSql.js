const mysql = require('mysql2');

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'nepthon',
  database: 'bricks&key'
});

module.exports = pool.promise();