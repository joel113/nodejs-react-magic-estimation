CREATE USER magic;
CREATE DATABASE magic;
GRANT ALL PRIVILEGES ON DATABASE magic TO magic;
CREATE TYPE element_state AS ENUM('ongoing','disbuted','agreed','locked');
CREATE TABLE elements (
    id varchar(255) PRIMARY KEY,
    votes integer not null,
    votes_round integer not null,
    element_state element_state not null);