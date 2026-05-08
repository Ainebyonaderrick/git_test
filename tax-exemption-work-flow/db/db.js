// Load environment variables from .env
require('dotenv').config();

// Import the pg library
const { Client } = require('pg');

// Create a PostgreSQL client using .env variables
const client = new Client({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

module.exports = Client;