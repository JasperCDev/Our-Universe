import { client } from './index';
import { Request, Response } from 'express';
import { QueryResult, QueryResultRow } from 'pg';

export const getGlobalClicks = (req: Request, res: Response) => {
  const query = {
    text: 'SELECT * FROM global_clicks',
  }

  client.query(query)
  .then((dbResponse: QueryResult) => res.send(dbResponse))
  .catch(() => res.sendStatus(500));
}

export const updateGlobalClicks = (req: Request, res: Response) => {
  const query = {
    text: 'UPDATE global_clicks SET click_count = global_clicks.click_count + $1',
    values: [req.body.clicks]
  }

  client.query(query)
  .then((dbResponse: QueryResult) => res.send('Global clicks updated!'))
  .catch(() => res.sendStatus(500));
}

export const getUser = (req: Request, res: Response) => {
  const query = {
    text: 'SELECT * FROM users WHERE user_name=$1',
    values: [req.query.u]
  }

  client.query(query)
  .then((dbResponse: QueryResult) => res.send(dbResponse.rows[0] || 'That user does not exist'))
  .catch(() => res.sendStatus(500));
}

export const createUser = (req: Request, res: Response) => {
  const create = {
    text: 'INSERT INTO users(user_name, user_clicks) VALUES($1, $2)',
    values: [req.body.user_name, 0]
  }

  client.query(create)
  .then(() => res.send({ user_name: req.body.user_name, message: `user ${req.body.user_name} created!` }))
  .catch((dbErr: QueryResultRow) => {
    if (dbErr.routine === '_bt_check_unique') {
      res.status(400).send('User already exists');
    }
    res.sendStatus(500).send(dbErr.detail);
  });
}

export const updateUserClicks = (req: Request, res: Response) => {
  const query = {
    text: 'UPDATE users SET user_clicks = users.user_clicks + $1 WHERE user_name = $2',
    values: [req.body.clicks, req.body.user_name]
  }

  client.query(query)
  .then(() => res.send('User clicks updated!'))
  .catch(() => res.sendStatus(500));
}

export const getTopUsers = (req: Request, res: Response) => {
  const query = {
    text: 'SELECT * FROM users ORDER BY user_clicks DESC LIMIT 10'
  }

  client.query(query)
  .then((dbResponse: QueryResult) => res.send(dbResponse.rows))
  .catch(() => res.sendStatus(500));
}
