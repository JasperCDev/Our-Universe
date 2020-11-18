import { client } from './index';
import { QueryResult, QueryResultRow } from 'pg';
import fs from 'fs';


const sql = fs.readFileSync('journeyToCreateTheUniverse.pgsql').toString();

client.query(sql)
  .then((dbResponse: QueryResult) => console.log('import sql file', dbResponse))
  .catch((err: QueryResultRow) => console.error(err));

client.query('INSERT INTO global_clicks(click_count) VALUES(0)')
  .then((dbResponse: QueryResult) => console.log('set default global clicks value', dbResponse))
  .catch((err: QueryResultRow) => console.error(err));

const create = {
  text: 'INSERT INTO users(user_name, user_clicks, is_online, planet_color) VALUES($1, $2, $3, $4)',
  values: ['JasperBOT', 0, true, '[64, 191, 255]'] as [string, number, boolean, string]
}


client.query(create)
  .then((dbResponse: QueryResult) => console.log('create JasperBOT', dbResponse))
  .catch((dbErr: QueryResultRow) => console.error(dbErr));




