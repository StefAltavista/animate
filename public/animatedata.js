(function () {
    var form = document.querySelector("form");
    var title = document.querySelector(".title");
    var body = document.querySelector("body");
    var up = false;
    var uph = false;
    var w = 0;
    var i = 0;
    var t = 0;
    var c = 0;
    var x = 0;
    var y = 0;
    var o = 0;

    const animateForm = () => {
        body.style.background = `linear-gradient(
            ${t}turn,
            rgb(161, 221, 230),
            rgba(88, 178, 234, 0.333),
            rgba(114, 114, 224, 0.354)
        )`;
        if (t == 1) t = 0;
        t += 0.002;

        body.style.opacity = o + "%";
        if (o < 100) o++;

        form.style.width = w + "px";
        form.style.height = w + "px";

        if (up) {
            c += 0.025;
            w = Math.floor(Math.sin(c) * 50 + 350);
        } else if (w < 350) {
            w += 0.85;
        } else {
            up = true;
        }

        i += 0.01;
        x = Math.sin(i) * 300;
        y = Math.cos(i) * 300;
        title.style.left = x + 125;
        title.style.top = y + 125;

        // header.style.fontSize = q + "px";

        // uph ? (q += 0.1) : (q -= 0.1);
        // if (q < 4) {
        //     uph = true;
        // }
        // if (q > 20) {
        //     uph = false;
        // }

        //posibility with sin function
        // if (uph) {
        //     k += 0.02;
        //     q = Math.sin(k) * 7 + 12;
        // } else if (q < 12) {
        //     q += 0.1;
        // } else {
        //     uph = true;
        // }
        requestAnimationFrame(animateForm);
    };

    animateForm();
})();
