import { Client } from 'pg';

export const client = new Client({
  connectionString: process.env.DATABASE_URL,
});

client.connect()
  .then(() => console.log('connected!!!!!!!!!!!!!'))
  .catch((err: Error) => console.error(err));



