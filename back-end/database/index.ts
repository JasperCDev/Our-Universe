import { Client } from 'pg';

export const client = new Client({
  connectionString: process.env.DATABASE_URL || 'postgres://postgres:postgres@127.0.0.1/journey_to_one_million',
});

client.connect()
  .then(() => console.log('connected!!!!!!!!!!!!!'))
  .catch((err: Error) => console.error(err));



