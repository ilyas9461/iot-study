const { Pool} = require('pg');

const pool = new Pool({
  user: 'postgres' , 
  database: 'iot-lys', 
  password: '*****', 
  port: 5432,
  host: 'localhost',
});

module.exports = { pool };