DROP DATABASE IF EXISTS startrek;
CREATE DATABASE startrek;

\c startrek;

CREATE TABLE starships (
  ID SERIAL PRIMARY KEY,
  name VARCHAR,
  registry VARCHAR,
  affiliation VARCHAR,
  launched INTEGER,
  class VARCHAR,
  captain VARCHAR
);

CREATE TABLE img_upload (
    title     varchar(40) NOT NULL,
    img_path    text,
    price  varchar(10),
    category  text,
    details  text
);

INSERT INTO starships (name, registry, affiliation, launched, class, captain)
  VALUES ('USS Enterprise', 'NCC-1701', 'United Federation of Planets Starfleet', 2258, 'Constitution', 'James T. Kirk');
