const { Pool} = require('pg');

const pool = new Pool({
  user: 'postgres' , //process.env.LOCAL_USER,
  database: 'iot-lys', //process.env.LOCAL_DATABASE,
  password: '*********', //process.env.LOCAL_PASS,
  port: 5432,
  host: 'localhost',
});

module.exports = { pool };