(function () {
    const account = document.querySelector("#account");
    const menu = document.querySelector("#menu");
    const body = document.querySelector("body");
    console.log(account, menu);
    var open = false;
    var i = 0;
    // const a = $("#account");
    // console.log(a);
    accountColor();
    account.addEventListener("click", (e) => {
        e.stopPropagation();
        if (open) {
            menu.style.height = "0px";
            open = false;
            return;
        } else {
            menu.style.height = "100px";
            open = true;
            return;
        }
    });

    body.addEventListener("click", () => {
        console.log(open, "body");
        if (open) {
            menu.style.height = "0px";
            open = false;
        }
        return;
    });
    var r = 0;
    function accountColor() {
        r = Math.floor(Math.sin(i) * 50 + 50);
        i += 0.3;
        // account.style.boxShadow = "0px 0px 20px 10px rgb(" + r + ", 175, 255);";
        account.style.backgroundColor = `rgb(${r},255,255);`;
        console.log(r);

        requestAnimationFrame(accountColor);
    }
})();
