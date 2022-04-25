(function () {
    var input = document.querySelectorAll("input");
    var str = "";

    for (var i = 0; i < input.length; i++) {
        console.log(input[i]);
        input[i].addEventListener("input", (e) => {
            console.log(e.target.value);
            if (!/^[a-zA-Z]+$/.test(e.target.value)) {
                if (e.target.value == "") {
                    str = e.target.value;
                    return;
                }
                e.target.value = null;
                e.target.value = str;
                // e.target.style.width = `10%`;
                e.target.style.boxShadow = `0px 0px 10px 1px rgb(213, 96, 97)`;
            } else {
                str = e.target.value;
                e.target.style.boxShadow = `0px 0px 10px 1px rgb(255, 255, 255)`;
            }
        });
    }
})();
