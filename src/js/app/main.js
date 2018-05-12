'use strict';

var call = new Call();
var dddOrigin = document.querySelector('#ddd_origin');
var dddDestination = document.querySelector('#ddd_destination');
var time = document.querySelector('#time');
var contactName = document.querySelector('#contact_name');
var email = document.querySelector('#email');
var message = document.querySelector('#message');
var faleMaisPrice = document.querySelector('#with_falemais_price');
var defaultPrice = document.querySelector('#without_falemais_price');
var withFaleMais = document.querySelector('.with.falemais');
var withoutFaleMais = document.querySelector('.without.falemais');
var planSelect = document.querySelector('#plan');
var snackbar = document.querySelector('.snackbar');
var params = {
    calls: null,
    plans: null
};

window.onload = function () {
    getRequest('api/calls', 'calls', mountDDDOptions);
    getRequest('api/plans', 'plans', mountPlansOptions);
    document.querySelector('#simulation-form').onsubmit = setLigacaoAttributes;
    document.querySelector('#contact-form').onsubmit = sendContact;
    document.querySelector('#ddd_origin').onchange = manageDestination;
};

function setLigacaoAttributes() {
    call.dddOrigin = Number(dddOrigin.value);
    call.dddDestination = Number(dddDestination.value);
    call.time = Number(time.value);
    call.plan = Number(planSelect.value);
    call.pricePerMinute = getPrice();
    call.tax = getTax();
    mountBenchmark();

    return false;
}

function goTo(id) {
    window.scroll(0, document.querySelector('#' + id).offsetTop - 100);
}

function sendContact() {
    var post = {
        contactName: contactName.value,
        email: email.value,
        messages: [{
            date: new Date(),
            content: message.value
        }]
    };
    postRequest('api/calls', post, snackbarAnimation);
    return false;
}

function postRequest(route, params, fn) {
    var req = new XMLHttpRequest();
    req.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            fn();
        }
    };
    req.open("POST", 'api/contact', true);
    req.setRequestHeader("Content-type", "application/json");
    req.send(JSON.stringify(params));

    return false;
}

function snackbarAnimation() {
    snackbar.classList.add('show');
    setTimeout(function () {
        return snackbar.classList.remove('show');
    }, 3000);
}

function getRequest(route, context, fn) {
    var req = new XMLHttpRequest();
    req.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            params[context] = JSON.parse(req.responseText);
            fn();
        }
    };
    req.open("GET", route, true);
    req.send();
}

function getPrice() {
    var origin = dddOrigin.value;
    var destination = dddDestination.value;
    var originCall = params.calls.filter(function (call) {
        return call.dddOrigin == origin;
    });
    var destCall = originCall[0].dddDestinations.filter(function (dest) {
        return dest.ddd == destination;
    });
    return destCall[0].pricePerMinute;
}

function getTax() {
    var planValue = plan.value;
    var planData = params.plans.filter(function (plan) {
        return plan.value == planValue;
    });
    return planData[0].tax;
}

function mountDDDOptions() {
    params.calls.forEach(function (call) {
        dddOrigin.add(new Option(0 + String(call.dddOrigin), call.dddOrigin, false));
        dddDestination.add(new Option(0 + String(call.dddOrigin), call.dddOrigin, false));
    });
}

function mountPlansOptions() {
    params.plans.forEach(function (plan) {
        planSelect.add(new Option(plan.text, plan.value, false));
    });
}

function mountBenchmark() {
    faleMaisPrice.textContent = call.faleMaisPrice.toLocaleString('pt-BR', { minimumFractionDigits: 2 });
    defaultPrice.textContent = call.defaultPrice.toLocaleString('pt-BR', { minimumFractionDigits: 2 });
    withFaleMais.classList.remove('better', 'worst');
    withoutFaleMais.classList.remove('better', 'worst');

    if (call.faleMaisPrice <= call.defaultPrice) {
        withFaleMais.classList.add('better');
        withoutFaleMais.classList.add('worst');
    } else {
        withFaleMais.classList.add('worst');
        withoutFaleMais.classList.add('better');
    }
}

function manageDestination(event) {
    removeDestinations();
    addDestination(event.target.value);
}

function removeDestinations() {
    var options = document.querySelectorAll('#ddd_destination option:not(:first-child)');
    options.forEach(function (ele) {
        ele.remove();
    });
    dddDestination.selectedIndex = null;
}

function addDestination(origin) {
    var call = params.calls.filter(function (call) {
        return call.dddOrigin == origin;
    });
    var arrDestinations = call[0].dddDestinations;
    arrDestinations.forEach(function (dest) {
        dddDestination.add(new Option(0 + String(dest.ddd), dest.ddd, false));
    });
}
//# sourceMappingURL=main.js.map