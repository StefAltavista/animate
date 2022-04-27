(function () {
    const account = document.querySelector("#account");
    const menu = document.querySelector("#menu");
    const body = document.querySelector("body");
    console.log(account, menu);
    var open = false;
    var i = -1;

    account.addEventListener("click", (e) => {
        e.stopPropagation();
        account.style.transform = "rotate(" + i + "turn)";
        i++;
        i = -i;
        console.log(i);
        if (open) {
            menu.style.height = "0px";
            open = false;
            return;
        } else {
            menu.style.height = "120px";
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
})();
