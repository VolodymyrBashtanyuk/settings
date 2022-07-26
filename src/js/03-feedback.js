import throttle from 'lodash.throttle';

const STORAGE_KEY = 'feedback-form-state';

const form = document.querySelector('.feedback-form');

form.addEventListener('submit', onFormSubmit);
form.addEventListener('input', throttle(onFormInput, 500));

getStorageInputs();

function onFormSubmit(e) {
  e.preventDefault();
  /*Для Вывода обьекта в консоль */
  const formData = new FormData(form);
  const userData = {};
  formData.forEach((value, name) => userData[name] = value);
  console.log(userData);
  /*Проверка на заполнение всех полей */
  const { email, message } = e.target.elements;
  if (email.value === "" || message.value === "") {
   return
  }
   e.currentTarget.reset();
  localStorage.removeItem(STORAGE_KEY);
}
function onFormInput(e) {
  let savedInputs = localStorage.getItem(STORAGE_KEY);
  savedInputs = savedInputs ? JSON.parse(savedInputs) : {};
  savedInputs[e.target.name] = e.target.value;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(savedInputs));
}
function getStorageInputs() {
  let savedData = localStorage.getItem(STORAGE_KEY);
  if (savedData) {
    savedData = JSON.parse(savedData);
    Object.entries(savedData).forEach(([name, value]) => {
      form.elements[name].value = value;
    });
  }
}