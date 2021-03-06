function checkLogin(req, res, next) {
    if (req.route.path == "/register" && req.session.signatureId) {
        console.log("in reg");
        res.redirect("./sign");
    } else if (req.route.path == "/login" && req.session.signatureId) {
        res.redirect("./sign");
    } else if (req.route.path == "/login" && !req.session.signatureId) {
        next();
        return;
    } else if (req.route.path != "/register" && !req.session.signatureId) {
        res.redirect("./register");
    } else {
        next();
        return;
    }
}

function checkAdd(req, res, next) {
    if (req.session.data) {
        res.redirect("./sign");
    }
    next();
    return;
}

function checkData(req, res, next) {
    var { age, city, country, website } = req.body;
    if (age == "" && city == "" && country == "" && website == "") {
        res.redirect("/sign");
        next();
    }

    if (!/^[0-9]+$/.test(age)) {
        console.log("redirect", age);
        age = null;
        res.redirect("/profile");
        next();
    }
    if (!website.startsWith("http://") || !website.startsWith("https://")) {
        website = "http://" + website;
    }

    return { age, city, country, website };
}
function checkSignature(req, res, next) {
    if (req.route.path == "/sign" && req.session.signature) {
        res.redirect("./thanks");
    } else if (req.route.path != "/sign" && !req.session.signature) {
        res.redirect("./sign");
        next();
    } else {
        console.log("in sig");
        next();
        return;
    }
}

//not a middleware
function checkQuery(req) {
    if (req.query) {
        var { ct, cn } = req.query;
        var verify;

        if (ct) {
            verify = /^[a-zA-Z]+$/.test(ct);
            verify ? "" : (ct = null);
        }
        if (cn) {
            verify = /^[a-zA-Z]+$/.test(cn);
            verify ? "" : (cn = null);
        }

        return { ct, cn };
    } else return { ct: null, cn: null };
}
module.exports = {
    checkAdd,
    checkData,
    checkLogin,
    checkSignature,
    checkQuery,
};
