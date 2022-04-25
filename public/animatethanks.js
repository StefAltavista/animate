(function () {
    var bubbles = document.querySelectorAll(".bubble");

    var body = document.querySelector("body");
    var t = 0;
    var y = [];
    var s = [];

    for (var i = 0; i < bubbles.length; i++) {
        bubbles[i].style.left = Math.random() * 80 + 10 + "%";
        y[i] = Math.random() * 95;
        s[i] = Math.random();

        bubbles[i].style.top = y[i] + "%";
    }

    const animate = () => {
        body.style.background = `linear-gradient(
            ${t}turn,
            rgb(161, 221, 230),
            rgba(88, 178, 234, 0.333),
            rgba(114, 114, 224, 0.354)
        )`;
        if (t == 1) t = 0;
        t += 0.002;

        for (i = 0; i < bubbles.length; i++) {
            y[i] -= s[i];
            bubbles[i].style.top = y[i] + "%";
            if (y[i] < 0) y[i] = 105;
        }

        requestAnimationFrame(animate);
    };

    animate();
})();
