const { client } = require('./index');

const getGlobalTotal = (req, res) => {
  const query = {
    text: 'SELECT global_clicks FROM global_total',
  }

  client.query(query)
  .then((dbResponse) => res.send(dbResponse.rows))
  .catch((dbErr) => res.sendStatus(500));
}

const updateGlobalTotal = (req, res) => {
  const query = {
    text: 'UPDATE global_total SET global_clicks = global_total.global_clicks + $1',
    values: [req.body.total]
  }

  client.query(query)
  .then((dbResponse) => res.send('Global clicks updated!'))
  .catch((dbErr) => res.sendStatus(500));
}

const getUser = (req, res) => {
  console.log(req.query.u);
  const query = {
    text: 'SELECT * FROM users WHERE user_name=$1',
    values: [req.query.u]
  }

  client.query(query)
  .then((dbResponse) => res.send(dbResponse.rows[0] || 'That user does not exist'))
  .catch((dbErr) => res.sendStatus(500));
}

const createUser = (req, res) => {
  const query = {
    text: 'INSERT INTO users(user_name, user_clicks) VALUES($1, $2)',
    values: [req.body.userName, 0]
  }

  client.query(query)
  .then((dbResponse) => res.send('User created!'))
  .catch((dbErr) => {
    if (dbErr.routine === '_bt_check_unique') {
      res.status(400).send('User already exists');
    }
    res.sendStatus(500).send(dbErr.detail);
  });
}

const updateUserTotal = (req, res) => {
  const query = {
    text: 'UPDATE users SET user_clicks = users.user_clicks + $1 WHERE user_name = $2',
    values: [req.body.total, req.body.userName]
  }

  client.query(query)
  .then((dbResponse) => res.send('User clicks updated!'))
  .catch((dbErr) => res.sendStatus(500));
}

const getTopTenUsers = (req, res) => {
  const query = {
    text: 'SELECT * FROM users ORDER BY user_clicks DESC LIMIT 10'
  }

  client.query(query)
  .then((dbResponse) => res.send(dbResponse.rows))
  .catch((dbErr) => res.sendStatus(500));
}


module.exports = {
  getGlobalTotal,
  updateGlobalTotal,
  getUser,
  createUser,
  updateUserTotal,
  getTopTenUsers
}