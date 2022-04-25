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
            x = e.clientX - canvas.offsetLeft;
            y = e.clientY - canvas.offsetTop;

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
