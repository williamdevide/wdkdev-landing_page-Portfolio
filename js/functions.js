/* This file contains the accessory functions called by JS files */

function validateName(element) {
    let errorelement = element.dataset.errorsms,
        value = element.value.trim(),
        regex;
    return "" !== value && !1 === /[^a-z | áéíóúãç]/i.test(value) ? ($("#" + errorelement).hide(),
        element.classList.remove("error"),
        !0) : ($("#" + errorelement).show(),
        element.classList.add("error"),
        !1)
}

function validateEmail(element) {
    let errorelement = element.dataset.errorsms,
        value = element.value.trim(),
        regex;
    return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value) ? ($("#" + errorelement).hide(),
        element.classList.remove("error"),
        !0) : ($("#" + errorelement).show(),
        element.classList.add("error"),
        !1)
}

function validateMessage(element) {
    let errorelement = element.dataset.errorsms,
        value;
    return "" !== element.value.trim() ? ($("#" + errorelement).hide(),
        element.classList.remove("error"),
        !0) : ($("#" + errorelement).show(),
        element.classList.add("error"),
        !1)
}