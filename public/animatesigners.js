(function () {
    var title = document.querySelector(".title");
    var body = document.querySelector("body");

    var i = 0;
    var t = 0;
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

        i += 0.01;
        x = Math.sin(i) * 300;
        y = Math.cos(i) * 300;
        title.style.left = x + 125;
        title.style.top = y + 125;
        requestAnimationFrame(animateForm);
    };

    animateForm();
})();
