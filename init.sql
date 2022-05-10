CREATE USER magic;

CREATE DATABASE magic;

GRANT ALL PRIVILEGES ON DATABASE magic TO magic;

CREATE TYPE element_state AS ENUM('ongoing','disbuted','agreed','locked');

CREATE TABLE elements (
    session_id char(8) NOT NULL,
    element_id varchar(255) NOT NULL,
    votes integer not null,
    votes_round integer not null,
    state element_state not null,
    created_at timestamp not null DEFAULT Now(),
    updated_at timestamp not null DEFAULT Now(),
    PRIMARY KEY(session_id, element_id));

CREATE TABLE votes (
    session_id char(8) NOT NULL,
    user_id char(8) not null,
    element_id integer not null,
    color integer not null,
    votes integer not null,
    created_at timestamp not null DEFAULT Now(),
    updated_at timestamp not null DEFAULT Now(),
    PRIMARY KEY(session_id, user_id, element_id));

CREATE TABLE rounds (
    session_id char(8) PRIMARY KEY,
    rounds integer not null,
    round_active integer not null,
    created_at timestamp not null DEFAULT Now(),
    updated_at timestamp not null DEFAULT Now());

CREATE TABLE users (
    session_id char(8) not null,
    user_id varchar(255) not null,
    color varchar(255) not null,
    created_at timestamp not null DEFAULT Now(),
    PRIMARY KEY(session_id, user_id));

DELETE FROM elements WHERE updated_at < now() - interval '7 days'

DELETE FROM rounds WHERE updated_at < now() - interval '7 days'

DELETE FROM users WHERE created_at < now() - interval '7 days'