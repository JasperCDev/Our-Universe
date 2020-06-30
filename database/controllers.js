const { client } = require('./index');

const getGlobalClicks = (req, res) => {
  const query = {
    text: 'SELECT * FROM global_clicks',
  }

  client.query(query)
  .then((dbResponse) => res.send(dbResponse))
  .catch((dbErr) => {
    console.log(dbErr);
    res.sendStatus(500);
  });
}

const updateGlobalClicks = (req, res) => {
  const query = {
    text: 'UPDATE global_clicks SET click_count = global_clicks.click_count + $1',
    values: [req.body.clicks]
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
    values: [req.body.user_name, 0]
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

const updateUserClicks = (req, res) => {
  const query = {
    text: 'UPDATE users SET user_clicks = users.user_clicks + $1 WHERE user_name = $2',
    values: [req.body.clicks, req.body.user_name]
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
  getGlobalClicks,
  updateGlobalClicks,
  getUser,
  createUser,
  updateUserClicks,
  getTopTenUsers
}