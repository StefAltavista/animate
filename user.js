const bcrypt = require("bcryptjs");
const db = require("./database/db.js");
var exists;

const neu = (req) => {
    const { email, password, name, surname } = req.body;
    return db.querydb().then(({ rows }) => {
        exists = rows.filter((x) => x.email == email);
        console.log(exists[0]);
        if (exists[0]) {
            return { e: exists[0].email, id: null };
        }

        return crypt(password).then((hash) => {
            return db.register(email, hash, name, surname).then(({ rows }) => {
                var n = name.split("")[0] + surname.split("")[0];
                return { e: null, id: rows[0].id, init: n };
            });
        });
    });
};

const crypt = (p) => {
    return bcrypt.genSalt().then((s) => {
        return bcrypt.hash(p, s);
    });
};

const decrypt = (p, h) => bcrypt.compare(p, h);

module.exports = {
    crypt,
    decrypt,
    neu,
};
