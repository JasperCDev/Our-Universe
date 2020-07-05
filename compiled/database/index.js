"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.client = void 0;
const pg_1 = require("pg");
exports.client = new pg_1.Client({
    user: 'postgres',
    password: 'postgres',
    port: 5432,
    database: 'journey_to_one_million',
});
exports.client.connect()
    .then(() => console.log('connected!!!!!!!!!!!!!'))
    .catch((err) => console.error(err));
