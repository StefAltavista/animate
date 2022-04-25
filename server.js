const express = require("express");
const app = express();
const db = require("./database/db");
const { engine } = require("express-handlebars");
const cookieSession = require("cookie-session");
const user = require("./user.js");
//const { redirect } = require("express/lib/response");
var verify;
var id, name, surname, signature, exists;
app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.use(
    cookieSession({
        secret: `masking the cookie with this string`,
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
    res.redirect("/home");
});
app.get("/home", (req, res) => {
    res.render("home", {
        title: "Animate Petition",
        script: [{ script: "./homeanimation.js" }],
        style: [{ style: "./home.css" }],
    });
});

app.get("/register", (req, res) => {
    res.render("register", {
        exists: exists,
        title: "Register",
        script: [{ script: "./animatedata.js" }],
        style: [{ style: "./style.css" }, { style: "data.css" }],
    });
});

app.post("/register", (req, res) => {
    const { email, password } = req.body;
    user.neu(email, password).then((id) => {
        if (id) {
            exists = false;
            req.session.signatureId = id;
            res.redirect("./data");
        } else {
            res.redirect("/register");
            exists = true;
        }
    });
});

app.get("/data", (req, res) => {
    if (req.session.data) res.redirect("/petition/sign");
    if (!req.session.signatureId) res.redirect("/petition/register");
    res.render("data", {
        title: "Data",
        script: [
            { script: "./countries.js" },
            { script: "./animatedata.js" },
            { script: "./inputcheck.js" },
        ],
        style: [
            { style: "style.css" },
            { style: "countries.css" },
            { style: "data.css" },
        ],
    });
});

app.post("/data", (req, res) => {
    let { name, surname, age, city, country, link } = req.body;

    if (!/^[0-9]+$/.test(age)) {
        age = null;
    }
    if (
        name == "" &&
        surname == "" &&
        age == "" &&
        city == "" &&
        country == "" &&
        link == ""
    ) {
        console.log("no data added, redirect to /sign");
        res.redirect("/sign");
        return;
    }

    db.add(req.session.signatureId, name, surname, age, city, country, link)
        .then(({ rows }) => {
            console.log("Data added:", rows);
            req.session.data = "added";
            res.redirect("/sign");
        })
        .catch((err) => {
            console.log("in catch db.add");
            console.log("err", err);
            res.sendStatus(500);
        });
});
app.get("/sign", (req, res) => {
    if (req.session.signature) res.redirect("/thanks");
    res.render("sign", {
        title: "Sign",
        script: [{ script: "./signature.js" }, { script: "./animate.js" }],
        style: [{ style: "style.css" }],
    });
});

app.post("/sign", (req, res) => {
    const { signature } = req.body;
    db.sign(signature);
    req.session.signature = "signed";
    res.redirect("/thanks");
});

app.get("/thanks", (req, res) => {
    if (!req.session.signatureId) res.redirect("/petition");
    if (!req.session.signature) res.redirect("/sign");

    db.signatoires().then(({ rows }) => {
        console.log("HERE: ", rows[0]);
        ({ id, name, surname, signature } = rows[0]);

        db.signatoires()
            .then(({ rows }) => {
                res.render("thanks", {
                    title: "Thanks!",
                    id: id,
                    name: name,
                    surname: surname,
                    signature: signature,
                    number: rows.length,
                    style: [{ style: "style.css" }, { style: "thanks.css" }],
                    script: [{ script: "/animatethanks.js" }],
                });
            })
            .catch((err) => console.log("error retrieving data", err));
    });
});
app.get("/signers", (req, res) => {
    if (!req.session.signatureId) res.redirect("/petition");
    if (!req.session.signature) res.redirect("/sign");
    var { ct, cn } = req.query;

    if (ct) {
        verify = /^[a-zA-Z]+$/.test(ct);
        console.log("ct", ct, verify);
        verify ? "" : (ct = null);
    }
    if (cn) {
        verify = /^[a-zA-Z]+$/.test(cn);
        console.log("cn", cn, verify);
        verify ? "" : (cn = null);
    }

    db.signatoires(ct, cn)
        .then(({ rows }) => {
            res.render("signers", {
                title: "Signers",
                signers: rows,
                style: [{ style: "/style.css" }, { style: "/signers.css" }],
                //script: [{ script: "./animate.js" }],
            });
        })
        .catch((err) => console.log("error", err));
});

app.get("*", (req, res) => {
    res.redirect("/");
});

app.listen(8080, console.log("Listening to port 8080"));
