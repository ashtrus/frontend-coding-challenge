import '../css/main.scss';
import {
  MDCSelect
} from '@material/select';

let brands = [];
let maxBrandsAmmount = 5;
let category;

let contactForm = document.getElementById('contactForm');
let brandList = document.getElementById('brandList');
let btnAddBrand = document.getElementById('btnAddBrand');
let messageText = document.getElementById('messageText');

// Inputs
let fullname = document.getElementById('fullName');
let email = document.getElementById('email');
let dob = document.getElementById('dob');
let brand = document.getElementById('brand');

// Functions
function displayMessage(message) {
  messageText.innerHTML = message;
  setTimeout(() => {
    messageText.innerHTML = '';
  }, 2000);
}

function removeBrand() {
  const index = Array.from(brandList.children).indexOf(this);

  if (brands.length > 0) {
    brands.splice(index, 1);
    brandList.removeChild(this);
  }
  btnAddBrand.disabled = false;
}

function addElementToDom(text) {
  const div = document.createElement('div');

  div.innerHTML = `
      <div class="mdc-chip">
        <div class="mdc-chip__text">${text}&nbsp;<span class="btnRemoveBrand">x</span></div>
      </div>
 `;

  div.addEventListener('click', removeBrand, false);
  brandList.appendChild(div);
}

function addNewBrand() {
  let brandName = brand.value;

  if (brandName !== '') {
    if (brands.length === maxBrandsAmmount) {
      btnAddBrand.disabled = true;
    } else {
      addElementToDom(brandName);
      brands.push(brandName);
      brand.value = '';
    }
  }
}

const select = new MDCSelect(document.querySelector('.mdc-select'));
select.listen('MDCSelect:change', () => {
  category = select.value;
});

// Send form data
function postForm(ev) {
  ev.preventDefault();

  let result = {
    fullName: fullname.value,
    email: email.value,
    dob: dob.value,
    brands: brands,
    category: category
  };

  console.log(result);
  contactForm.reset();

  // Removes brand names from DOM
  while (brandList.firstChild) {
    brandList.removeChild(brandList.firstChild);
  }
  displayMessage('Your data was sent.');
}

// Event listeners
contactForm.addEventListener('submit', postForm);
btnAddBrand.addEventListener('click', addNewBrand);
