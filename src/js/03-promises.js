// Завдання 3 - генератор промісів
// Напиши скрипт, який на момент сабміту форми викликає
//  функцію createPromise(position, delay) стільки разів,
//   скільки ввели в поле amount.
//   Під час кожного виклику передай їй номер промісу(position),
//   що створюється, і затримку, враховуючи першу затримку(delay),
//   введену користувачем, і крок(step).

import { Notify } from 'notiflix/build/notiflix-notify-aio';
const formEl = document.querySelector('.form');
const delayEl = document.querySelector('input[name=delay]');
const stepEl = document.querySelector('input[name=step]');
const amountEl = document.querySelector('input[name=amount]');

formEl.addEventListener('submit', onSubmitForm);

function onSubmitForm(e) {
  e.preventDefault();
  const delay = Number(stepEl.value);
  let amountInterval = 0;
  let delayValue = Number(delayEl.value);
  const intervalId = setInterval(() => {
    amountInterval += 1;
    if (amountEl.value < amountInterval) {
      clearInterval(intervalId);
      return;
    }
    createPromise(amountInterval, delayValue)
      .then(onMakeFulfilled)
      .catch(onMakeRejected);
    delayValue += delay;
  }, delay);
}

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        resolve(`✅ Fulfilled promise ${position} in ${delay}ms`);
      } else {
        reject(`❌ Rejected promise ${position} in ${delay}ms`);
      }
    }, delay);
  });
}

function onMakeFulfilled(result) {
  Notify.success(result);
}
function onMakeRejected(error) {
  Notify.failure(error);
}
