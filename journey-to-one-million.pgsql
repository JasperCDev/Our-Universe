DROP DATABASE IF EXISTS journey_to_one_million;

CREATE DATABASE journey_to_one_million;

\c journey_to_one_million;

DROP TABLE IF EXISTS global_total;

CREATE TABLE global_total (
  global_clicks INTEGER NOT NULL DEFAULT 0
);

DROP TABLE IF EXISTS users;

CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  user_name VARCHAR(15) NOT NULL UNIQUE,
  user_clicks INTEGER NOT NULL
);
