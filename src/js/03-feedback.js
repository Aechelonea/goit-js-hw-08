const throttle = require('lodash.throttle');
const save = (key, value) => {
  try {
    const serializedState = JSON.stringify(value);
    localStorage.setItem(key, serializedState);
  } catch (error) {
    console.error('Set state error: ', error.message);
  }
};

const load = key => {
  try {
    const serializedState = localStorage.getItem(key);
    return serializedState === null ? undefined : JSON.parse(serializedState);
  } catch (error) {
    console.error('Get state error: ', error.message);
  }
};

const inputForm = document.querySelector('.feedback-form');
const formValuesObj = { email: '', message: '' };
const storageFormObj = load('feedback-form-state');

if (storageFormObj != undefined) {
  formValuesObj.email = storageFormObj.email;
  formValuesObj.message = storageFormObj.message;
  inputForm[0].value = formValuesObj.email;
  inputForm[1].value = formValuesObj.message;
}

inputForm.addEventListener(
  'input',
  throttle(event => {
    formValuesObj[event.target.name] = event.target.value;
    save('feedback-form-state', formValuesObj);
  }, 500)
);

inputForm.addEventListener('submit', e => {
  e.preventDefault();
  let formEmail = e.target[0];
  let formMessage = e.target[1];
  console.log(`Email: ${formEmail.value} 
Message: ${formMessage.value}
  `);
  formEmail.value = null;
  formMessage.value = null;
  localStorage.removeItem('feedback-form-state');
});
