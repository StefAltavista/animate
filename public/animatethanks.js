(function () {
    var bubbles = document.querySelectorAll(".bubble");
    var names = document.querySelectorAll("#names");
    console.log(names[0].innerHTML);

    var body = document.querySelector("body");
    var t = 0;
    var y = [];
    var s = [];
    var r = 0;

    for (var i = 0; i < bubbles.length; i++) {
        bubbles[i].innerHTML =
            names[Math.floor(Math.random() * names.length)].innerHTML;
        bubbles[i].style.left = Math.random() * 70 + 10 + "%";
        y[i] = Math.random() * 95;
        s[i] = Math.random() + 0.1;

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

            if (y[i] < 0) {
                r = Math.floor(Math.random() * 255);
                bubbles[i].style.background = `inear-gradient(
                    rgba(${r}, 255, 255, 0.459),
                    rgba(176, 161, 230, 0.512)
                );`;
                y[i] = 75;
                bubbles[i].style.top = y[i] + "%";
                bubbles[i].style.left = Math.random() * 70 + 10 + "%";
            }
        }

        requestAnimationFrame(animate);
    };

    animate();
})();
