const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

const db = require('../database/index');
const dbControllers = require('../database/controllers');

const bodyParser = require('body-parser');
const path = require('path');

const compression = require('compression');

app.use(compression());
app.use(express.static(path.join(__dirname, '../public')));
app.use(bodyParser.json());

app.get('/total', (req, res) => {
  dbControllers.getGlobalTotal(req, res);
});

app.put('/total', (req, res) => {
  dbControllers.updateGlobalTotal(req, res);
});

app.get('/user', (req, res) => {
  dbControllers.getUser(req, res);
});

app.post('/user', (req, res) => {
  dbControllers.createUser(req, res);
});

app.put('/user', (req, res) => {
  dbControllers.updateUserTotal(req, res);
});

app.get('/users', (req, res) => {
  dbControllers.getTopTenUsers(req, res);
});


app.listen(PORT, () => console.log(`Listening on PORT ${PORT}`));
