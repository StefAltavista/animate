(function () {
    var input = document.querySelectorAll("input");

    var str = "";

    for (var i = 0; i < input.length; i++) {
        input[i].addEventListener("input", (e) => {
            str = e.target.value;
            e.target.style.boxShadow = `0px 0px 0px 0px rgb(255, 255, 255)`;
            if (e.target.name == "age") {
                if (!/^[0-9]+$/.test(e.target.value)) {
                    check(e);
                }
            } else if (e.target.name == "website") {
                str = e.target.value;
                e.target.style.boxShadow = `0px 0px 10px 1px rgb(255, 255, 255)`;
            } else if (!/^[a-zA-Z]+$/.test(e.target.value)) {
                check(e);
            } else {
            }
        });
    }

    const check = (e) => {
        if (e.target.value == "" || e.target.value == " ") {
            str = e.target.value;
            return;
        }
        e.target.value = null;
        e.target.value = str;
        e.target.style.boxShadow = `0px 0px 10px 1px rgb(213, 96, 97)`;
    };
})();
