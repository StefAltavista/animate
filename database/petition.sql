
DROP TABLE IF EXISTS userData;
DROP TABLE IF EXISTS signatures;
DROP TABLE IF EXISTS users;

CREATE TABLE users(
     id             SERIAL PRIMARY KEY,
     email          VARCHAR UNIQUE NOT NULL CHECK (email != ''),
     hash           VARCHAR NOT NULL CHECK (hash != ''),
     created_at     TIMESTAMP DEFAULT CURRENT_TIMESTAMP
     
);
CREATE TABLE userData(
     id             SERIAL PRIMARY KEY,
     user_id        INT NOT NULL UNIQUE REFERENCES users(id), 
     name           VARCHAR,  
     surname        VARCHAR,  
     age            INT, 
     city           VARCHAR, 
     country        VARCHAR, 
     link           VARCHAR
);
CREATE TABLE signatures(
     id             SERIAL PRIMARY KEY,
     user_id        INT NOT NULL UNIQUE REFERENCES users(id),
     signature      VARCHAR NOT NULL CHECK (signature !='')

);

--DUMMY DATA--


INSERT INTO users(email, hash) 
VALUES ( 'stefano@altavista.com' , 'mypasswordhashedinacrazyway');
INSERT INTO users(email, hash) 
VALUES ( 'stefano@spices.com' , 'anotherpasswordhashedinacrazyway');
INSERT INTO users(email, hash) 
VALUES ( 'jimmy@hendrix.com' , 'jimmyspasswordhashedinacrazyway');
INSERT INTO users(email, hash) 
VALUES ( 'alexander@thegreat' , 'alexanderspasswordhashedinacrazyway');

INSERT INTO userData(user_id, name, surname, age,city,country,link) 
VALUES (1, 'Stefano', 'Altavista', 30, 'Berlin', 'Germany', 'google.com');
INSERT INTO userData(user_id, name, surname, age,city,country,link) 
VALUES (2, 'Spicy', 'Stef', 30, 'Berlin', 'Germany', 'google.com');
INSERT INTO userData(user_id, name, surname, age,city,country,link) 
VALUES (3, 'Jimmy', 'Hendrix', 27, 'Woodstock', 'USA', 'google.com');
INSERT INTO userData(user_id, name, surname, age,city,country,link) 
VALUES (4, 'Alexander', 'Thegreat', 30, 'Athens', 'Greece', 'google.com');

INSERT INTO signatures(user_id,signature) 
VALUES (1,'mysigaturecodifiedinacrazyway');
INSERT INTO signatures(user_id,signature) 
VALUES (3,'jimmyssigaturecodifiedinacrazyway');
INSERT INTO signatures(user_id,signature) 
VALUES (4,'alexanderssigaturecodifiedinacrazyway');