
DROP TABLE IF EXISTS userData;
DROP TABLE IF EXISTS signatures;
DROP TABLE IF EXISTS users;

CREATE TABLE users(
     id             SERIAL PRIMARY KEY,
     email          VARCHAR UNIQUE NOT NULL CHECK (email != ''),
     hash           VARCHAR NOT NULL CHECK (hash != ''),
     name           VARCHAR,  
     surname        VARCHAR,  
     created_at     TIMESTAMP DEFAULT CURRENT_TIMESTAMP
     
);
CREATE TABLE userData(
     id             SERIAL PRIMARY KEY,
     user_id        INT NOT NULL UNIQUE REFERENCES users(id), 
     age            INT, 
     city           VARCHAR, 
     country        VARCHAR, 
     website        VARCHAR
);
CREATE TABLE signatures(
     id             SERIAL PRIMARY KEY,
     user_id        INT NOT NULL UNIQUE REFERENCES users(id),
     signature      VARCHAR NOT NULL CHECK (signature !='')

);

--DUMMY DATA--


INSERT INTO users(email, hash, name, surname) 
VALUES ( 'stefano@altavista.com' , 'mypasswordhashedinacrazyway', 'Stefano', 'Altavista');
INSERT INTO users(email, hash, name, surname) 
VALUES ( 'stefano@spices.com' , 'anotherpasswordhashedinacrazyway', 'Spicy', 'Stef');
INSERT INTO users(email, hash, name, surname) 
VALUES ( 'jimmy@hendrix.com' , 'jimmyspasswordhashedinacrazyway', 'Jimmy', 'Hendrix');
INSERT INTO users(email, hash, name, surname) 
VALUES ( 'alexander@thegreat' , 'alexanderspasswordhashedinacrazyway', 'Alexander', 'Thegreat');

INSERT INTO userData(user_id, age, city, country, website) 
VALUES (1, 30, 'Berlin', 'Germany', 'http://www.google.com');
INSERT INTO userData(user_id, age, city, country, website) 
VALUES (2, 30, 'Berlin', 'Germany', 'http://www.google.com');
INSERT INTO userData(user_id, age, city, country, website) 
VALUES (3, 27, 'Woodstock', 'USA', 'http://www.google.com');
INSERT INTO userData(user_id, age, city, country, website) 
VALUES (4, 30, 'Athens', 'Greece', 'http://www.google.com');

INSERT INTO signatures(user_id,signature) 
VALUES (1,'mysigaturecodifiedinacrazyway');
INSERT INTO signatures(user_id,signature) 
VALUES (3,'jimmyssigaturecodifiedinacrazyway');
INSERT INTO signatures(user_id,signature) 
VALUES (4,'alexanderssigaturecodifiedinacrazyway');