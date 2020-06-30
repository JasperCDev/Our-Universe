const { Client } = require('pg');

const client = new Client({
  user: 'postgres',
  password: 'postgres',
  port: 5432,
  database: 'journey_to_one_million',
});

client.connect()
  .then(() => console.log('connected!!!!!!!!!!!!!'))
  .catch((err) => console.error(err));

module.exports = {
  client,
};


