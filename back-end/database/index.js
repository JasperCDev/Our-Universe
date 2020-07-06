"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.client = void 0;
var pg_1 = require("pg");
exports.client = new pg_1.Client({
    user: 'postgres',
    password: 'postgres',
    port: 5432,
    database: 'journey_to_one_million',
});
exports.client.connect()
    .then(function () { return console.log('connected!!!!!!!!!!!!!'); })
    .catch(function (err) { return console.error(err); });
