const call = new Call();
const dddOrigin = document.querySelector('#ddd_origin');
const dddDestination = document.querySelector('#ddd_destination');
const time = document.querySelector('#time');
const contactName = document.querySelector('#contact_name');
const email = document.querySelector('#email');
const message = document.querySelector('#message');
const faleMaisPrice = document.querySelector('#with_falemais_price');
const defaultPrice = document.querySelector('#without_falemais_price');
const withFaleMais = document.querySelector('.with.falemais');
const withoutFaleMais = document.querySelector('.without.falemais');
const planSelect = document.querySelector('#plan');
const snackbar = document.querySelector('.snackbar');
const params = {
    calls: null,
    plans: null,
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
  window.scroll(0, document.querySelector(`#${id}`).offsetTop - 100);
}

function sendContact() {
  const post = {
      contactName: contactName.value,
      email: email.value,
      messages: [
          {
              date: new Date(),
              content: message.value,
            },
      ],
    };
  postRequest('api/calls', post, snackbarAnimation);
  return false;
}

function postRequest(route, params, fn) {
  const req = new XMLHttpRequest();
  req.onreadystatechange = function () {
      if (this.readyState == 4 && this.status == 200) {
        fn();
      }
    };

  req.open('POST', 'api/contact', true);
  req.setRequestHeader('Content-type', 'application/json');
  req.send(JSON.stringify(params));

  return false;
}

function snackbarAnimation() {
  snackbar.classList.add('show');
  setTimeout(() => snackbar.classList.remove('show'), 3000);
}

function getRequest(route, context, fn) {
  const req = new XMLHttpRequest();
  req.onreadystatechange = function () {
      if (this.readyState == 4 && this.status == 200) {
        params[context] = JSON.parse(req.responseText);
        fn();
      }
    };

  req.open('GET', route, true);
  req.send();
}

function getPrice() {
  const origin = dddOrigin.value;
  const destination = dddDestination.value;
  const originCall = params.calls.filter(call => call.dddOrigin == origin);
  const destCall = originCall[0].dddDestinations.filter((dest) => dest.ddd == destination);
  return destCall[0].pricePerMinute;
}

function getTax() {
  const planValue = plan.value;
  const planData = params.plans.filter(plan => plan.value == planValue);
  return planData[0].tax;
}

function mountDDDOptions() {
  params.calls.forEach(call => {
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
  faleMaisPrice.textContent = call.faleMaisPrice.toLocaleString('pt-BR',
    { minimumFractionDigits: 2 }
  );
  defaultPrice.textContent = call.defaultPrice.toLocaleString('pt-BR',
    { minimumFractionDigits: 2 }
  );

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
  const options = document.querySelectorAll('#ddd_destination option:not(:first-child)');
  options.forEach(ele => {
      ele.remove();
    });
  dddDestination.selectedIndex = null;
}

function addDestination(origin) {
  const call = params.calls.filter(call => call.dddOrigin == origin);
  const arrDestinations = call[0].dddDestinations;
  arrDestinations.forEach(dest => {
      dddDestination.add(new Option(0 + String(dest.ddd), dest.ddd, false));
    });
}
