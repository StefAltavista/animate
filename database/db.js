const spicedPg = require("spiced-pg");

const db = spicedPg("postgres:postgres:postgres@localhost:5432/petition");

module.exports.query = () => db.query("SELECT * FROM signatures;");
module.exports.queryId = (id) =>
    db.query("SELECT * FROM signatures WHERE id = $1", [id]);
module.exports.add = (name, surname, age, city, country, signature) => {
    return db.query(
        `INSERT INTO signatures (name, surname, age, city, country, signature) VALUES ($1, $2, $3, $4, $5, $6) RETURNING id`,
        [name, surname, age, city, country, signature]
    );
};

module.exports.count = () => db.query("SELECT COUNT(id) FROM signatures");
