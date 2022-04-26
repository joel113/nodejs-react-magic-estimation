CREATE USER magic;
CREATE DATABASE magic;
GRANT ALL PRIVILEGES ON DATABASE magic TO magic;
CREATE TYPE element_state AS ENUM('ongoing','disbuted','agreed','locked');
CREATE TABLE elements (
    session_id uuid NOT NULL,
    element_id varchar(255) NOT NULL,
    votes integer not null,
    votes_round integer not null,
    element_state element_state not null,
    PRIMARY KEY(session_id, element_id));
CREATE TABLE rounds (
    session_id uuid PRIMARY KEY,
    rounds integer not null,
    rounds_active integer not null);