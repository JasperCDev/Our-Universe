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
  .then(() => res.send('Global clicks updated!'))
  .catch(() => res.sendStatus(500));
}

export const getUser = (req: Request, res: Response) => {
  const query = {
    text: 'SELECT * FROM users WHERE id=$1',
    values: [Number(req.query.id)]
  }

  client.query(query)
  .then((dbResponse: QueryResult) => res.send(dbResponse.rows[0] || 'That user does not exist'))
  .catch(() => res.sendStatus(500));
}


export const updateOnlineStatus = (req: Request, res: Response) => {
  const { user_id, is_online } = req.body;
  console.log(user_id, is_online);
  const query = {
    text: 'UPDATE users SET is_online = $1 WHERE id = $2',
    values: [is_online, user_id]
  }

  client.query(query)
    .then((dbResponse: QueryResult) => {
      console.log(dbResponse);
      res.send('online status updated');
    })
    .catch((err: QueryResultRow) => {
      console.log(err);
      res.sendStatus(500);
    });

}

export const createUser = (req: Request, res: Response) => {
  const create = {
    text: 'INSERT INTO users(user_name, user_clicks, is_online) VALUES($1, $2, $3) RETURNING id',
    values: [req.body.user_name, 0, req.body.is_online]
  }

  client.query(create)
  .then((dbResponse: QueryResult) => res.send(dbResponse.rows[0]))
    .catch((dbErr: QueryResultRow) => {
      res.sendStatus(500).send(dbErr.detail);
  });
}

export const updateUserClicks = (req: Request, res: Response) => {
  const query = {
    text: 'UPDATE users SET user_clicks = users.user_clicks + $1 WHERE id = $2',
    values: [req.body.clicks, req.body.id]
  }

  client.query(query)
  .then(() => res.send('User clicks updated!'))
  .catch(() => res.sendStatus(500));
}

export const updateUsername = (req: Request, res: Response) => {
  const query = {
    text: 'UPDATE users SET user_name = $1 WHERE id = $2',
    values: [req.body.new_user_name, req.body.user_id]
  }
  client.query(query)
  .then(() => res.send('Username updated!'))
  .catch(() => res.sendStatus(500));
}

export const getTopUsers = (req: Request, res: Response) => {
  const query = {
    text: 'SELECT * FROM users ORDER BY user_clicks DESC LIMIT 25'
  }

  client.query(query)
  .then((dbResponse: QueryResult) => res.send(dbResponse.rows))
  .catch(() => res.sendStatus(500));
}
