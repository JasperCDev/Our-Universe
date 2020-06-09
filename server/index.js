const express = require('express');
const app = express();
const port = 3000;

const db = require('../database/index');
const dbControllers = require('../database/controllers');

const bodyParser = require('body-parser');


app.use(express.static('public'));
app.use(bodyParser.json());

app.get('/total', (req, res) => {
  dbControllers.getGlobalTotal((err, results) => {
    if (err) {
      console.error(err);
      res.sendStatus(500);
    } else {
      res.send(results);
    }
  });
});

app.put('/total', (req, res) => {
  dbControllers.updateGlobalTotal(req.body.total, (err, results) => {
    if (err) {
      console.error(err);
      res.sendStatus(500);
    } else {
      res.send(results);
    }
  });
});

app.get('/user', (req, res) => {
  const userName = req.query.u;
  dbControllers.getUser(userName, (err, results) => {
    if (err) {
      console.error(err);
      res.sendStatus(500);
    } else {
      res.send(results);
    }
  });
});

app.post('/user', (req, res) => {
  dbControllers.createUser(req.body.userName, (err, results) => {
    if (err) {
      console.error(err);
      res.sendStatus(500);
    } else {
      res.send(results);
    }
  });
});

app.put('/user', (req, res) => {
  dbControllers.updateUserTotal(req.body.userName, req.body.userSessionTotal, (err, results) => {
    if (err) {
      console.error(err);
      res.sendStatus(500);
    } else {
      res.send(results);
    }
  });
});

app.get('/users', (req, res) => {
  const n = Number(req.query.n);
  dbControllers.getTopUsers(n, (err, results) => {
    if (err) {
      console.error(err);
    } else {
      res.send(results);
    }
  })
});


app.listen(port, () => console.log(`Listening on PORT ${port}`));
