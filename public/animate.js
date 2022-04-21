(function () {
    var title = document.querySelector(".title");
    var form = document.querySelector("form");
    var header = document.querySelector(".header");
    var body = document.querySelector("body");
    var up = true;
    var uph = true;
    form.style.backgroundColor = "blue";
    var w = 0;
    var q = 0;
    var t = 0;
    const animateForm = () => {
        body.style.background = `linear-gradient(
            ${t}turn,
            rgb(161, 221, 230),
            rgba(88, 178, 234, 0.333),
            rgba(114, 114, 224, 0.354)
        )`;
        if (t == 1) t = 0;
        t += 0.002;
        form.style.width = w + "px";
        form.style.height = w + "px";
        up ? (w += 0.7) : (w -= 0.7);
        if (w < 400) {
            up = true;
        }
        if (w > 500) {
            up = false;
        }

        header.style.fontSize = q + "px";

        uph ? (q += 0.1) : (q -= 0.1);
        if (q < 15) {
            uph = true;
        }
        if (q > 30) {
            uph = false;
        }
        requestAnimationFrame(animateForm);
    };

    animateForm();
})();
