const express = require("express");
const app = express();
const db = require("./database/db");
const { engine } = require("express-handlebars");

app.engine("handlebars", engine());
app.set("view engine", "handlebars");

app.use(express.static("./public"));
app.use(express.static("./database"));
app.use(
    express.urlencoded({
        extended: false,
    })
);

app.get("/", (req, res) => {
    console.log("GET request made to / \n redirecting to /petition");
    res.redirect("/petition");
});

app.get("/petition", (req, res) => {
    res.render("home", {
        title: "petition",
        script: [{ script: "./countries.js" }, { script: "./script.js" }],
        style: [{ style: "style.css" }, { style: "countries.css" }],
    });
});

app.post("/petition", (req, res) => {
    const { name, surname, age, city, country } = req.body;

    console.log("\n name and age:", name, age);
    db.add(name, surname, age, city, country)
        .then(({ rows }) => {
            console.log(rows);
        })
        .catch((err) => {
            console.log("err", err);
            res.sendStatus(500);
        });
    res.redirect("/petition/signed");
});

app.get("/petition/signed", (req, res) => {
    let n;
    db.count()
        .then((result) => (n = result))
        .catch((err) => console.log("error retrieving data", err));
    res.render("signed", {
        title: "Thanks!",
        number: n,
    });
});
app.get("/petition/signers", (req, res) => {
    db.query()
        .then(({ rows }) => {
            res.render("signers", {
                title: "Signers",
                signers: rows,
            });
        })
        .catch((err) => console.log("error", err));
});
app.listen(8080, console.log("Listening to port 8080"));
