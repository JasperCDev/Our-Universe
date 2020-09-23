DROP TABLE IF EXISTS global_clicks;

CREATE TABLE global_clicks (
  click_count INTEGER NOT NULL DEFAULT 0
);

DROP TABLE IF EXISTS users;

CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  user_name VARCHAR(15) NOT NULL,
  user_clicks INTEGER NOT NULL,
  is_online BOOLEAN NOT NULL
);
