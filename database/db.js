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

module.exports.add = (user_id, name, surname, age, city, country, link) => {
    return db.query(
        `INSERT INTO userData (user_id, name, surname, age, city, country,link) VALUES ($1, $2, $3, $4, $5, $6,$7) RETURNING id`,
        [user_id, name, surname, age, city, country, link]
    );
};

module.exports.sign = (user_id, signature) => {
    return db.query(
        `INSERT INTO signatures (user_id, signature) VALUES ($1, $2) RETURNING id`,
        [user_id, signature]
    );
};
