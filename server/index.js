const express = require('express');
const app = express();
const port = 3000;

const db = require('../database/index');
const dbControllers = require('../database/controllers');

const bodyParser = require('body-parser')


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
  })
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
  dbControllers.getUser(req.body.userName, (err, results) => {
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
      res.send({ message: results});
    }
  });
});



app.listen(port, () => console.log(`Listening on PORT ${port}`));