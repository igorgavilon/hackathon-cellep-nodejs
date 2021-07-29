const { Pool } = require('pg')
const globalSettings = require('./globalSettings');

const client = new Pool({
  connectionString: process.env.DATABASE_URL || globalSettings.dbString,
  ssl: {
    rejectUnauthorized: false
  }
})

module.exports = client