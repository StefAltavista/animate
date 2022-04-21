const express = require("express");
const app = express();
const db = require("./database/db");
const { engine } = require("express-handlebars");
const cookieSession = require("cookie-session");
var id, name, surname, signature;
app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.use(
    cookieSession({
        secret: `I'm always angry.`,
        maxAge: 1000 * 60 * 60 * 24 * 14,
    })
);

app.use(express.static("./public"));
app.use(express.static("./database"));
app.use(
    express.urlencoded({
        extended: false,
    })
);

app.get("/", (req, res) => {
    res.redirect("/petition");
});

app.get("/petition", (req, res) => {
    if (req.session.signatureId) res.redirect("/petition/thanks");
    res.render("home", {
        title: "petition",
        script: [
            { script: "./countries.js" },
            { script: "./signature.js" },
            { script: "./animate.js" },
        ],
        style: [{ style: "style.css" }, { style: "countries.css" }],
    });
});

app.post("/petition", (req, res) => {
    const { name, surname, age, city, country, signature } = req.body;
    db.add(name, surname, age, city, country, signature)
        .then(({ rows }) => {
            console.log("id:", rows[0].id);
            req.session.signatureId = rows[0].id;
            id = rows[0].id;
            res.redirect("/petition/thanks");
        })
        .catch((err) => {
            console.log("err", err);
            res.sendStatus(500);
        });
});

app.get("/petition/thanks", (req, res) => {
    if (!req.session.signatureId) res.redirect("/petition");

    db.queryId(req.session.signatureId).then(({ rows }) => {
        console.log("HERE: ", rows[0]);
        ({ id, name, surname, signature } = rows[0]);

        db.query()
            .then((all) => {
                res.render("thanks", {
                    title: "Thanks!",
                    id: id,
                    name: name,
                    surname: surname,
                    signature: signature,
                    number: all.rows.length,
                });
            })
            .catch((err) => console.log("error retrieving data", err));
    });
});
app.get("/petition/signers", (req, res) => {
    if (!req.session.signatureId) res.redirect("/petition");

    db.query()
        .then(({ rows }) => {
            res.render("signers", {
                title: "Signers",
                signers: rows,
                style: [{ style: "/style.css" }, { style: "/signers.css" }],
                script: [{ script: "./animate.js" }],
            });
        })
        .catch((err) => console.log("error", err));
});

app.listen(8080, console.log("Listening to port 8080"));
