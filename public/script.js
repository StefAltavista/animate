// I'm the script
(function () {
    var canvas = document.querySelector("canvas");

    var c = canvas.getContext("2d");
    var down;

    let x;
    let y;
    canvas.addEventListener("mousemove", (e) => {
        if (down) {
            c.lineWidth = 3;
            x = e.clientX - canvas.offsetLeft;
            y = e.clientY - canvas.offsetTop;

            c.lineTo(x, y);
            c.stroke();
        }
    });
    canvas.addEventListener("mousedown", (e) => {
        down = true;
        c.beginPath();
        c.moveTo(x, y);
    });
    canvas.addEventListener("mouseup", () => {
        down = false;
    });
})();
