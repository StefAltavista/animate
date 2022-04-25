const bcrypt = require("bcryptjs");
const db = require("./database/db.js");
var exists;
module.exports.neu = (email, password) => {
    return db.query("userAuth").then(({ rows }) => {
        console.log("method neu:", rows);
        rows.filter((x) => {
            x.email == email ? (exists = true) : (exists = false);
        });

        if (exists) {
            return null;
        } else {
            return crypt(password).then((hash) => {
                return db.register(email, hash).then(({ rows }) => {
                    return rows[0].id;
                });
            });
        }
    });
};

const crypt = (p) => {
    return bcrypt.genSalt().then((s) => {
        return bcrypt.hash(p, s);
    });
};

const decrypt = (p, h) => bcrypt.compare(p, h);
