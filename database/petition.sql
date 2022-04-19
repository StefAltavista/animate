DROP TABLE IF EXISTS signatures;

CREATE TABLE signatures (
     id SERIAL PRIMARY KEY,
     name VARCHAR NOT NULL CHECK (name != ''),
     surname VARCHAR NOT NULL CHECK (surname != ''),
     age int NOT NULL,
     city VARCHAR NOT NULL CHECK (name != ''),
     country VARCHAR NOT NULL CHECK (country !='')
     --signature VARCHAR NOT NULL CHECK (signature != '')
);