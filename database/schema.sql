DROP SCHEMA IF EXISTS mellow CASCADE;
CREATE SCHEMA mellow;
SET search_path TO mellow;

CREATE EXTENSION pgcrypto;

-- —————————————————————————————————————————————————————————————————————————————
-- Tables

CREATE TABLE users (
   id          SERIAL        PRIMARY KEY,
   email       VARCHAR(255)  UNIQUE NOT NULL,
   password    VARCHAR(255)  NOT NULL,
   created_at  TIMESTAMP     NOT NULL,
   updated_at  TIMESTAMP     NOT NULL,
);

CREATE TABLE todos (
   id     SERIAL        PRIMARY KEY,
   user   INTEGER       NOT NULL,
   title  VARCHAR(255)  NOT NULL,
)

-- —————————————————————————————————————————————————————————————————————————————
-- Constraints



-- —————————————————————————————————————————————————————————————————————————————
-- Indices
