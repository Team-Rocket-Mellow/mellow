DROP SCHEMA IF EXISTS mellow CASCADE;
CREATE SCHEMA mellow;
SET search_path TO mellow;

SET work_mem to '50 MB';
CREATE EXTENSION pgcrypto;

-- —————————————————————————————————————————————————————————————————————————————
-- Tables

CREATE TABLE users (
  id          SERIAL        PRIMARY KEY,
  email       VARCHAR(255)  UNIQUE NOT NULL,
  password    VARCHAR(255)  NOT NULL,
  created_at  TIMESTAMP     NOT NULL,
  updated_at  TIMESTAMP     NOT NULL,
  notif       BOOLEAN       TRUE,
  sid         VARCHAR(32)   UNIQUE NOT NULL,
  photo       URL
);

CREATE TABLE tickets (
  id          SERIAL        PRIMARY KEY,
  user        INT           NOT NULL,
  title       VARCHAR(255)  NOT NULL,
  body        TEXT          NOT NULL,
  due_at      TIMESTAMP     NOT NULL,
  notif       BOOLEAN       TRUE,
);

CREATE TABLE notifications (
  id           SERIAL        PRIMARY KEY,
  ticket       INT           NOT NUll,
  sender_id    INT           NOT NULL,
  recipient_id INT           NOT NULL,
  body         TEXT          NOT NULL,
  time         TIMESTAMP     NOT NULL,
);

CREATE TABLE sessions (
  id           SERIAL        PRIMARY KEY,
  sid          VARCHAR(32)   NOT NULL,
  expire       TIMESTAMP     NOT NULL,
  sess         VARCHAR(255)  NOT NULL,
);

-- —————————————————————————————————————————————————————————————————————————————
-- Constraints

ALTER TABLE tickets       ADD FOREIGN KEY (user)   REFERENCES users (id);
ALTER TABLE notifications ADD FOREIGN KEY (ticket) REFERENCES tickets (id);
ALTER TABLE sessions      ADD FOREIGN KEY (sid)    REFERENCES users (sid);

-- —————————————————————————————————————————————————————————————————————————————
-- Indices

CREATE INDEX i1 ON users (id);
CREATE INDEX i2 ON tickets (id);
CREATE INDEX i3 ON tickets (user);
CREATE INDEX i4 ON notifications (id);
CREATE INDEX i5 ON notifications (ticket);
