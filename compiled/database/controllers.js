"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTopTenUsers = exports.updateUserClicks = exports.createUser = exports.getUser = exports.updateGlobalClicks = exports.getGlobalClicks = void 0;
const index_1 = require("./index");
exports.getGlobalClicks = (req, res) => {
    const query = {
        text: 'SELECT * FROM global_clicks',
    };
    index_1.client.query(query)
        .then((dbResponse) => res.send(dbResponse))
        .catch(() => res.sendStatus(500));
};
exports.updateGlobalClicks = (req, res) => {
    const query = {
        text: 'UPDATE global_clicks SET click_count = global_clicks.click_count + $1',
        values: [req.body.clicks]
    };
    index_1.client.query(query)
        .then((dbResponse) => res.send('Global clicks updated!'))
        .catch(() => res.sendStatus(500));
};
exports.getUser = (req, res) => {
    const query = {
        text: 'SELECT * FROM users WHERE user_name=$1',
        values: [req.query.u]
    };
    index_1.client.query(query)
        .then((dbResponse) => res.send(dbResponse.rows[0] || 'That user does not exist'))
        .catch(() => res.sendStatus(500));
};
exports.createUser = (req, res) => {
    const query = {
        text: 'INSERT INTO users(user_name, user_clicks) VALUES($1, $2)',
        values: [req.body.user_name, 0]
    };
    index_1.client.query(query)
        .then(() => res.send({ user_name: req.body.user_name }))
        .catch((dbErr) => {
        console.log('typeof dbErr', typeof dbErr);
        if (dbErr.routine === '_bt_check_unique') {
            res.status(400).send('User already exists');
        }
        res.sendStatus(500).send(dbErr.detail);
    });
};
exports.updateUserClicks = (req, res) => {
    const query = {
        text: 'UPDATE users SET user_clicks = users.user_clicks + $1 WHERE user_name = $2',
        values: [req.body.clicks, req.body.user_name]
    };
    index_1.client.query(query)
        .then((dbResponse) => res.send('User clicks updated!'))
        .catch((dbErr) => res.sendStatus(500));
};
exports.getTopTenUsers = (req, res) => {
    const query = {
        text: 'SELECT * FROM users ORDER BY user_clicks DESC LIMIT 10'
    };
    index_1.client.query(query)
        .then((dbResponse) => res.send(dbResponse.rows))
        .catch((dbErr) => res.sendStatus(500));
};
