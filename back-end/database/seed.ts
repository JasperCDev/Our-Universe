import { client } from './index';
import { Request, Response } from 'express';
import { QueryResult, QueryResultRow } from 'pg';
import { createUser } from './controllers';
import fs from 'fs';


const sql = fs.readFileSync('journey-to-one-million.pgsql').toString();
console.log(sql);
client.query(sql)
  .then((dbResponse: QueryResult) => console.log(dbResponse))
  .catch((err: QueryResultRow) => console.error(err));

client.query(('INSERT INTO global_clicks(click_count) VALUES(0)'))
  .then((dbResponse: QueryResult) => console.log('is this where its breaking?', dbResponse))
  .catch((err: QueryResultRow) => console.error(err));

  const create = {
    text: 'INSERT INTO users(user_name, user_clicks) VALUES($1, $2)',
    values: ['JasperBOT', 0]
  }

  client.query(create)
  .then((dbResponse: QueryResult) => console.log('????????????????????????', dbResponse))
    .catch((dbErr: QueryResultRow) => console.error(dbErr)
  );

console.log('made it here!!!');

// createUser({ body: { user_name: 'JosephBOT' } } as Request, { send: () => { } } as Response);

// createUser({ body: { user_name: 'BethanyBOT' } } as Request, { send: () => { } } as Response);

// createUser({ body: { user_name: 'DavidBOT' } } as Request, { send: () => { } } as Response);

// createUser({ body: { user_name: 'KellieBOT' } } as Request, { send: () => { } } as Response);

// createUser({ body: { user_name: 'JayBOT' } } as Request, { send: () => { } } as Response);

// createUser({ body: { user_name: 'TimBOT' } } as Request, { send: () => { } } as Response);

// createUser({ body: { user_name: 'JimenaBOT' } } as Request, { send: () => { } } as Response);

// createUser({ body: { user_name: 'RileyBOT' } } as Request, { send: () => { } } as Response);

// createUser({ body:{ user_name: 'MarkBOT' } } as Request, { send: () => { } } as Response);