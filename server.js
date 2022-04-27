const express = require("express");
const app = express();
const db = require("./database/db");
const { engine } = require("express-handlebars");
const cookieSession = require("cookie-session");
const user = require("./user.js");
const {
    checkLogin,
    checkAdd,
    checkData,
    checkSignature,
    checkQuery,
} = require("./middleware.js");

var exists;
app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.use(
    cookieSession({
        secret: `MaskingTheCookieWithThisString`,
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

app.get("/register", checkLogin, (req, res) => {
    res.render("register", {
        exists: exists,
        title: "Register",
        script: [{ script: "./animatedata.js" }],
        style: [{ style: "./style.css" }, { style: "data.css" }],
    });
});

app.post("/register", checkLogin, (req, res) => {
    user.neu(req).then(({ e, id, init }) => {
        if (e) {
            exists = e;
            res.redirect("./register");
        } else {
            req.session.signatureId = id;
            req.session.init = init;
            res.redirect("./data");
        }
    });
});

app.get("/login", checkLogin, (req, res) => {
    res.render("login", {
        title: "Log in",
        script: [{ script: "./animatedata.js" }],
        style: [{ style: "./style.css" }, { style: "data.css" }],
    });
});
app.post("/login", checkLogin, (req, res) => {
    user.login(req).then(({ e, id, init, data, signed }) => {
        if (e) {
            exists = e;
            res.redirect("./login");
        } else {
            req.session.signatureId = id;
            req.session.init = init;
            req.session.data = data;
            req.session.signature = signed;
            console.log(req.session);
            res.redirect("./data");
        }
    });
});

app.get("/data", checkLogin, checkAdd, (req, res) => {
    res.render("data", {
        title: "Data",
        init: req.session.init,

        script: [
            { script: "./countries.js" },
            { script: "./animatedata.js" },
            { script: "./inputcheck.js" },
            { script: "./menu.js" },
        ],
        style: [
            { style: "style.css" },
            { style: "countries.css" },
            { style: "data.css" },
        ],
    });
});

app.post("/data", checkLogin, checkData, (req, res) => {
    let { age, city, country, website } = req.body;

    db.add(req.session.signatureId, age, city, country, website)
        .then(() => {
            req.session.data = "Data added";
            res.redirect("/sign");
        })
        .catch((err) => {
            console.log("err", err);
            res.sendStatus(500);
        });
});
app.get("/sign", checkLogin, checkSignature, (req, res) => {
    res.render("sign", {
        title: "Sign",
        init: req.session.init,
        script: [
            { script: "./signature.js" },
            { script: "./animate.js" },
            { script: "./menu.js" },
        ],
        style: [{ style: "style.css" }],
    });
});

app.post("/sign", checkLogin, checkSignature, (req, res) => {
    const { signature } = req.body;
    db.sign(req.session.signatureId, signature);
    req.session.signature = "signed";
    res.redirect("/thanks");
});

app.get("/thanks", checkLogin, checkSignature, (req, res) => {
    db.queryById(req.session.signatureId).then(({ rows }) => {
        const { name, surname, signature } = rows[0];

        db.signatoires()
            .then(({ rows }) => {
                var names = [];
                rows.forEach((x) => {
                    names.push({
                        name: x.name.split("")[0] + x.name.split("")[0],
                    });
                });
                res.render("thanks", {
                    title: "Thanks!",
                    init: req.session.init,
                    name: name,
                    surname: surname,
                    signature: signature,
                    number: rows.length,
                    names,
                    style: [{ style: "style.css" }, { style: "thanks.css" }],
                    script: [
                        { script: "/animatethanks.js" },
                        { script: "./menu.js" },
                    ],
                });
            })
            .catch((err) => console.log("error retrieving data", err));
    });
});
app.get("/signers", checkLogin, checkSignature, (req, res) => {
    const { ct, cn } = checkQuery(req);
    db.signatoires(ct, cn)
        .then(({ rows }) => {
            res.render("signers", {
                title: "Signers",
                init: req.session.init,
                signers: rows,
                style: [{ style: "/style.css" }, { style: "/signers.css" }],
                script: [
                    { script: "./menu.js" },
                    { script: "./animatesigners.js" },
                ],
            });
        })
        .catch((err) => console.log("error", err));
});

app.get("/profile", checkLogin, (req, res) => {
    db.queryById(req.session.signatureId).then(({ rows }) => {
        const { name, surname, age, city, country, website, signature } =
            rows[0];

        console.log(rows);
        res.render("profile", {
            title: "My Profile",
            init: req.session.init,
            name,
            surname,
            age,
            city,
            country,
            website,
            signature,
            script: [{ script: "./menu.js" }],
            style: [{ style: "style.css" }, { style: "profile.css" }],
        });
    });
});

app.get("/edit", checkLogin, (req, res) => {
    db.queryById(req.session.signatureId).then(({ rows }) => {
        const { name, surname, age, city, country, website, email } = rows[0];

        console.log(rows);
        res.render("edit", {
            title: "edit profile",
            init: req.session.init,
            name,
            surname,
            age,
            city,
            country,
            website,
            email,

            script: [{ script: "./menu.js" }],
            style: [{ style: "edit.css" }],
        });
    });
});

app.post("/edit", (req, res) => {
    let { name, surname, age, city, country, website, email, password } =
        req.body;
    let hash;
    db.queryById(req.session.signatureId).then(({ rows }) => {
        if (!password) {
            hash = rows[0].hash;
        } else {
            hash = user.crypt(password);
        }

        if (typeof age != "number") age = null;
        db.update(
            req.session.signatureId,
            name,
            surname,
            age,
            city,
            country,
            website,
            email,
            hash
        ).then(() => res.redirect("/profile"));
    });
});

app.post("/deletesignature", (req, res) => {
    db.deletesignature(req.session.signatureId).then(() =>
        res.redirect("/profile")
    );
});

app.get("/logout", (req, res) => {
    exists = null;
    req.session = null;
    res.redirect("/home");
});

app.get("*", (req, res) => {
    res.redirect("/");
});
app.listen(process.env.PORT || 8080);
//app.listen(8080, console.log("Listening to port 8080"));
