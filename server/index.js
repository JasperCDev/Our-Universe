const express = require('express');
const app = express();
const port = 3000;

const db = require('../database/index');
const dbFunctions  = require('../database/models');

const bodyParser = require('body-parser')


app.use(express.static('public'));
app.use(bodyParser.json());

app.get('/total', (req, res) => {
  dbFunctions.getGlobalTotal((err, results) => {
    if (err) {
      console.error(err);
      res.sendStatus(500);
    } else {
      res.send(results);
    }
  })
});

app.put('/total', (req, res) => {
  dbFunctions.updateGlobalTotal(req.body.total, (err, results) => {
    if (err) {
      console.error(err);
      res.sendStatus(500);
    } else {
      res.send(results);
    }
  })
})


app.listen(port, () => console.log(`Listening on PORT ${port}`));