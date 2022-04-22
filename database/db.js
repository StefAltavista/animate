const spicedPg = require("spiced-pg");

const db = spicedPg("postgres:postgres:postgres@localhost:5432/petition");
var where;

module.exports.query = (table) => db.query(`SELECT * FROM ${table};`);

module.exports.signatoires = (ct, cn) => {
    if (ct) {
        where = ` WHERE LOWER(userData.city) = LOWER('${ct}')`;
    } else if (cn) {
        where = ` WHERE LOWER(userData.country) = LOWER('${cn}')`;
    } else {
        where = "";
    }

    return db.query(`SELECT userData.name, userData.age, userData.city, userData.country, userData.link 
                                                FROM users
                                                JOIN userData
                                                ON users.id = userData.user_id
                                                ${where};`);
};

module.exports.queryBy = (table, x, val) =>
    db.querydb.query(`SELECT * FROM ${table} WHERE ${x} = ${val}`);
module.exports.register = (email, hash) => {
    return db.query(
        `INSERT INTO users (email,hash) VALUES( $1 , $2) RETURNING id`,
        [email, hash]
    );
};

module.exports.add = (name, surname, age, city, country) => {
    return db.query(
        `INSERT INTO userData (name, surname, age, city, country) VALUES ($1, $2, $3, $4, $5) RETURNING id`,
        [name, surname, age, city, country]
    );
};

module.exports.sign = (signature) => {
    return db.query(
        `INSERT INTO signature (signature) VALUES ($1) RETURNING id`,
        [signature]
    );
};
