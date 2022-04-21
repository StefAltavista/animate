(function () {
    var canvas = document.querySelector("canvas");
    var signature = document.querySelector("#signature");
    var c = canvas.getContext("2d");
    var down;
    let x;
    let y;
    var cUrl;

    canvas.addEventListener("mousemove", (e) => {
        if (down) {
            c.lineWidth = 1;
            c.strokeStyle = "midnightBlue";
            x = e.pageX - canvas.offsetLeft;
            y = e.pageY - canvas.offsetTop;
            if (x > 280 || x < 10 || y > 90 || y < 10) {
                down = false;
                return;
            }
            console.log(canvas.offsetHeight, canvas.offsetTop);
            c.lineTo(x, y);
            c.stroke();
        }
    });
    canvas.addEventListener("mousedown", () => {
        down = true;
    });
    canvas.addEventListener("mouseup", () => {
        cUrl = canvas.toDataURL();
        signature.value = cUrl;

        c.beginPath();
        down = false;
    });
})();
