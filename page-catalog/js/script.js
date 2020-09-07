// fonts (gulp)
function fontsStyle(params) {

    let file_content = fs.readFileSync(source_folder + '/scss/fonts.scss');
    if (file_content == '') {
        fs.writeFile(source_folder + '/scss/fonts.scss', '', cb);
        return fs.readdir(path.build.fonts, function (err, items) {
            if (items) {
                let c_fontname;
                for (var i = 0; i < items.length; i++) {
                    let fontname = items[i].split('.');
                    fontname = fontname[0];
                    if (c_fontname != fontname) {
                        fs.appendFile(source_folder + '/scss/fonts.scss', '@include font("' + fontname + '", "' + fontname + '", "400", "normal");\r\n', cb);
                    }
                    c_fontname = fontname;
                }
            }
        })
    }
}




// varaiable declaration
const btnMenu = document.querySelector(".top-header__burger"),
    menu = document.querySelector(".top-header-adaptive-menu__list"),

    btnMenuCatalog = document.querySelector(".catalog__burger-box"),
    menuCatalog = document.querySelector(".catalog__body"),

    wrapperForModalWindow = document.querySelector(".wrapper-for-modal-window"),
    loginBtn = document.querySelector("#loginBtn"),
    loginWindow = document.querySelector("#loginWindow"),
    registrationBtn = document.querySelector("#registrationBtn"),
    registrationWindow = document.querySelector("#registrationWindow"),
    backCallBtn = document.querySelector("#backCallBtn"),
    backCallWindow = document.querySelector("#backCallWindow"),
    removeAllItemsInFilter = document.querySelector(".comparison-filter__remove-all-items");


let acc = document.getElementsByClassName("catalog__item--subcategory");
let itemsGoods = document.querySelectorAll(".comparison-filter__remove-icon");


// function for correct work animation (when "display: none")
function displayBlock(getElem) {
    getElem.style.display = "block";
}

function displayNone(getElem) {
    setTimeout(() => getElem.style.display = "none", 400)
}














// menu header
toggleMenu = function () {

    menu.classList.toggle("top-header-adaptive-menu__list--active")

    if (menu.classList.contains("top-header-adaptive-menu__list--no-active")) {
        displayBlock(menu);
    }

    menu.classList.toggle("top-header-adaptive-menu__list--no-active")


    if (menu.classList.contains("top-header-adaptive-menu__list--no-active")) {
        displayNone(menu);
    }

};

btnMenu.addEventListener("click", (function (t) {
    t.stopPropagation(),
        toggleMenu()
}
));

document.addEventListener("click", (function (t) {
    const e = t.target
        , n = e == menu || menu.contains(e)
        , a = e == btnMenu
        , o = menu.classList.contains("top-header-adaptive-menu__list--active");
    n || a || !o || toggleMenu()
}
));






// menu catalog
toggleMenuCatalog = function () {
    menuCatalog.classList.toggle("catalog__body--active");

    if (!menuCatalog.classList.contains("catalog__body--active")) {
        displayNone(menuCatalog);
    }
    else if (menuCatalog.classList.contains("catalog__body--active")) {
        displayBlock(menuCatalog);
    }
};

btnMenuCatalog.addEventListener("click", (function (t) {
    t.stopPropagation(),
        toggleMenuCatalog()
}
));

document.addEventListener("click", (function (t) {
    const a = btnMenuCatalog
    a || toggleMenuCatalog()
}
));

// fix bag whith catalog
document.addEventListener("DOMContentLoaded", function () {
    displayNone(menuCatalog);
})







// catalog submenu
for (let i = 0; i < acc.length; i++) {
    acc[i].addEventListener("click", function () {

        let panel = this.nextElementSibling;
        panel.classList.toggle("catalog__item--show");

        if (panel.style.maxHeight) {
            panel.style.maxHeight = null;
        } else {
            panel.style.maxHeight = panel.scrollHeight + "px";
        }
    });
}












// modal window "LOGIN"
loginBtn.addEventListener("click", function () {
    document.body.style.overflow = "hidden";
    displayBlock(wrapperForModalWindow);
    displayBlock(loginWindow);
    loginWindow.classList.add("modal-window--active");
    loginWindow.classList.remove("modal-window--no-active");
})
// modal window "REGISTRATION"
registrationBtn.addEventListener("click", function () {
    document.body.style.overflow = "hidden";
    displayBlock(wrapperForModalWindow);
    displayBlock(registrationWindow);
    registrationWindow.classList.add("modal-window--active");
    registrationWindow.classList.remove("modal-window--no-active");
})
// modal window "BACK-CALL"
backCallBtn.addEventListener("click", function () {
    document.body.style.overflow = "hidden";
    displayBlock(wrapperForModalWindow);
    displayBlock(backCallWindow);
    backCallWindow.classList.add("modal-window--active");
    backCallWindow.classList.remove("modal-window--no-active");
})



//close modal window
function closeWindow() {
    let modalWindowActive = document.querySelector(".modal-window--active");
    displayNone(modalWindowActive);
    modalWindowActive.classList.remove("modal-window--active");
    modalWindowActive.classList.add("modal-window--no-active");
    displayNone(wrapperForModalWindow);
    setTimeout(() => document.body.style.overflowY = "scroll", 400);
}

wrapperForModalWindow.addEventListener("click", function () {
    closeWindow();
})




//filter range
let $range = $(".range-price__input");
let $inputFrom = $("#minPriceInput");
let $inputTo = $("#maxPriceInput");
let instance;
let min = 1000;
let max = 100000;
let from = 5000;
let to = 60000;

$range.ionRangeSlider({
    skin: "round",
    type: "double",
    min: min,
    max: max,
    from: 20000,
    to: 40000,
    onStart: updateInputs,
    onChange: updateInputs,
    onFinish: updateInputs,
});
instance = $range.data("ionRangeSlider");

function updateInputs(data) {
    from = data.from;
    to = data.to;

    $inputFrom.prop("value", from);
    $inputTo.prop("value", to);
}

$inputFrom.on("change", function () {
    var val = $(this).prop("value");

    // validate
    if (val < min) {
        val = min;
    } else if (val > to) {
        val = to;
    }

    instance.update({
        from: val
    });

    $(this).prop("value", val);

});

$inputTo.on("change", function () {
    var val = $(this).prop("value");

    // validate
    if (val < from) {
        val = from;
    } else if (val > max) {
        val = max;
    }

    instance.update({
        to: val
    });

    $(this).prop("value", val);
});


// catalog submenu
for (let i = 0; i < acc.length; i++) {
    acc[i].addEventListener("click", function () {

        let panel = this.nextElementSibling;
        panel.classList.toggle("catalog__item--show");

        if (panel.style.maxHeight) {
            panel.style.maxHeight = null;
        } else {
            panel.style.maxHeight = panel.scrollHeight + "px";
        }
    });
}



// remove item-goods into filtre
for (let i = 0; i < itemsGoods.length; i++) {
    itemsGoods[i].addEventListener("click", function () {
        let thisItemGoods = this.parentNode;
        thisItemGoods.style.opacity = "0";
        setTimeout(() => thisItemGoods.remove(), 400)
    })
}

// remove all items into filtre
removeAllItemsInFilter.addEventListener("click", function () {
    let allItemsInFilter = document.querySelector(".comparison-filter__items");
    if (allItemsInFilter) {
        allItemsInFilter.style.opacity = "0";
        setTimeout(() => allItemsInFilter.remove(), 400);
    }
})