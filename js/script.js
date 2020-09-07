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

    btnMenuAdaptCatalog = document.querySelector(".adapt-catalog__burger-box"),
    menuAdaptCatalog = document.querySelector(".adapt-catalog__body"),

    wrapperForModalWindow = document.querySelector(".wrapper-for-modal-window"),
    loginBtn = document.querySelector("#loginBtn"),
    loginWindow = document.querySelector("#loginWindow"),
    registrationBtn = document.querySelector("#registrationBtn"),
    registrationWindow = document.querySelector("#registrationWindow"),
    backCallBtn = document.querySelector("#backCallBtn"),
    backCallWindow = document.querySelector("#backCallWindow");

let acc = document.getElementsByClassName("catalog__item--subcategory");


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




// main slider
$(document).ready(function () {
    $('.slider__body').slick({
        arrows: false,
        dots: true,
        adaptiveHeight: false,
        slidesToShow: 1,
        slidesToScroll: 1,
        speed: 500,
        easing: 'linear',
        draggable: true,
        variableWidth: true,
        focusOnSelect: false,
        infinite: true,
        autoplay: true,
        autoplaySpeed: 4000,

    });
});





// adapt-catalog menu
toggleMenuAdaptCatalog = function () {
    menuAdaptCatalog.classList.toggle("catalog__body--active");
    menuAdaptCatalog.classList.toggle("adapt-catalog__body--active");

    if (!menuAdaptCatalog.classList.contains("catalog__body--active")) {
        displayNone(menuAdaptCatalog);
    }
    else {
        displayBlock(menuAdaptCatalog);
    }

};

btnMenuAdaptCatalog.addEventListener("click", (function (t) {
    t.stopPropagation();
    toggleMenuAdaptCatalog();
}
));











$(document).on("click", ".nextPage", function () {

    $.ajax({
        url: $(this).attr('data_target'),
        cache: false,
        success: function (html) {
            $("#content").html(html);
        }
    });

});




$(document).on("click", ".prevPage", function () {

    $.ajax({
        url: $(this).attr('data_target'),
        cache: false,
        success: function (html) {
            $("#content").html(html);
        }
    });

});








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


