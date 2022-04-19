const spicedPg = require("spiced-pg");

const db = spicedPg(
    "postgres:postgres:postgres@localhost:5432/petition_signers"
);

module.exports.query = () => db.query("SELECT * FROM signatures");
module.exports.add = (name, surname, age, city, country) => {
    return db.query(
        `INSERT INTO signatures (name, surname, age, city, country) VALUES ($1, $2, $3, $4, $5)`,
        [name, surname, age, city, country]
    );
};

module.exports.count = () => db.query("SELECT COUNT(id) FROM signatures");
