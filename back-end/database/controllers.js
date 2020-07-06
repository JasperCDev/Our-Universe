"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTopTenUsers = exports.updateUserClicks = exports.createUser = exports.getUser = exports.updateGlobalClicks = exports.getGlobalClicks = void 0;
var index_1 = require("./index");
exports.getGlobalClicks = function (req, res) {
    var query = {
        text: 'SELECT * FROM global_clicks',
    };
    index_1.client.query(query)
        .then(function (dbResponse) { return res.send(dbResponse); })
        .catch(function () { return res.sendStatus(500); });
};
exports.updateGlobalClicks = function (req, res) {
    var query = {
        text: 'UPDATE global_clicks SET click_count = global_clicks.click_count + $1',
        values: [req.body.clicks]
    };
    index_1.client.query(query)
        .then(function (dbResponse) { return res.send('Global clicks updated!'); })
        .catch(function () { return res.sendStatus(500); });
};
exports.getUser = function (req, res) {
    var query = {
        text: 'SELECT * FROM users WHERE user_name=$1',
        values: [req.query.u]
    };
    index_1.client.query(query)
        .then(function (dbResponse) { return res.send(dbResponse.rows[0] || 'That user does not exist'); })
        .catch(function () { return res.sendStatus(500); });
};
exports.createUser = function (req, res) {
    // const checkUsername = {
    //   text: 'SELECT * FROM users WHERE user_name=$1',
    //   values: [req.body.user_name]
    // }
    // client.query(checkUsername)
    // .then((dbResponse: QueryResult) => res.send(dbResponse.rows[0] || 'That user does not exist'))
    var create = {
        text: 'INSERT INTO users(user_name, user_clicks) VALUES($1, $2)',
        values: [req.body.user_name, 0]
    };
    index_1.client.query(create)
        .then(function () { return res.send({ user_name: req.body.user_name }); })
        .catch(function (dbErr) {
        console.log('typeof dbErr', typeof dbErr);
        if (dbErr.routine === '_bt_check_unique') {
            res.status(400).send('User already exists');
        }
        res.sendStatus(500).send(dbErr.detail);
    });
};
exports.updateUserClicks = function (req, res) {
    var query = {
        text: 'UPDATE users SET user_clicks = users.user_clicks + $1 WHERE user_name = $2',
        values: [req.body.clicks, req.body.user_name]
    };
    index_1.client.query(query)
        .then(function () { return res.send('User clicks updated!'); })
        .catch(function () { return res.sendStatus(500); });
};
exports.getTopTenUsers = function (req, res) {
    var query = {
        text: 'SELECT * FROM users ORDER BY user_clicks DESC LIMIT 10'
    };
    index_1.client.query(query)
        .then(function (dbResponse) { return res.send(dbResponse.rows); })
        .catch(function () { return res.sendStatus(500); });
};
