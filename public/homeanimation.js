(function () {
    const body = document.querySelector("body");
    const button = document.querySelector("button");
    const title = document.querySelector(".title");
    var t = 0;
    var x = -100;
    var y = -100;
    var i = 0;
    var w = 100;
    var up = true;
    var o = 0;
    const animate = () => {
        body.style.background = `linear-gradient(
            ${t}turn,
            rgba(100, 198, 254, 0.5),
            rgba(196, 187, 254, 0.5)
        )`;
        if (t == 1) t = 0;
        t += 0.003;

        body.style.opacity = o + "%";
        if (o < 100) (o += 1), 5;

        i += 0.02;
        x = Math.sin(i) * 200;
        y = Math.cos(i) * 200;
        button.style.left = x + 50;
        button.style.top = y + 50;

        w = Math.floor(Math.sin(i) * 40 + 180);
        // up ? (w += 0.5) : (w -= 0.5);
        // if (w < 180) {
        //     up = true;
        // }
        // if (w > 200) {
        //     up = false;
        // }

        title.style.width = w + "px";
        title.style.height = w + "px";
        requestAnimationFrame(animate);
    };
    animate();
})();
