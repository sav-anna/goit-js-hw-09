// Завдання 2 - таймер зворотного відліку
// Напиши скрипт таймера, який здійснює зворотний відлік до певної дати.
// Такий таймер може використовуватися у блогах та інтернет - магазинах,
// сторінках реєстрації подій, під час технічного обслуговування тощо.

import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { Report } from 'notiflix/build/notiflix-report-aio';

const refs = {
  startBtn: document.querySelector('button[data-start]'),
  date: document.querySelector('#datetime-picker'),
  days: document.querySelector('[data-days]'),
  hours: document.querySelector('[data-hours]'),
  minutes: document.querySelector('[data-minutes]'),
  seconds: document.querySelector('[data-seconds]'),
};

let timerId = null;
let selectedDate = null;
let currentDate = null;
let deltaTime = 0;

refs.startBtn.addEventListener('click', timer);
refs.startBtn.disabled = true;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    // console.log(selectedDates[0]);
    onSelectedData(selectedDates);
  },
};

flatpickr(refs.date, options);
const createTimer = ({ days, hours, minutes, seconds }) => {
  refs.days.textContent = `${days}`;
  refs.hours.textContent = `${hours}`;
  refs.minutes.textContent = `${minutes}`;
  refs.seconds.textContent = `${seconds}`;
};
function onSelectedData(selectedDates) {
  selectedDate = selectedDates[0].getTime();
  currentDate = new Date().getTime();

  if (selectedDate > currentDate) {
    refs.startBtn.disabled = false;
    Report.success('Натисніть старт');
    return;
  }
  Report.failure('Виберіть дату в майбутньому будь-ласка!');
}

function timer() {
  timerId = setInterval(() => {
    currentDate = new Date().getTime();
    if (selectedDate - currentDate < 1000) {
      clearInterval(timerId);
      refs.startBtn.disabled = true;
      refs.days.disabled = false;
      Report.info('Таймер завершено. Оновіть дату!');
      return;
    } else {
      refs.startBtn.disabled = true;
      refs.days.disabled = true;
      currentDate += 1000;
      deltaTime = Math.floor(selectedDate - currentDate);
      const time = convertMs(deltaTime);
      createTimer(time);
    }
  }, 1000);
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}
function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = addLeadingZero(Math.floor(ms / day));
  // Remaining hours
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  // Remaining minutes
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  // Remaining seconds
  const seconds = addLeadingZero(
    Math.floor((((ms % day) % hour) % minute) / second)
  );
  return { days, hours, minutes, seconds };
}

// console.log(convertMs(2000)); // {days: 0, hours: 0, minutes: 0, seconds: 2}
// console.log(convertMs(140000)); // {days: 0, hours: 0, minutes: 2, seconds: 20}
// console.log(convertMs(24140000)); // {days: 0, hours: 6 minutes: 42, seconds: 20}

// Var Repety
// function pad(value) {
//   return String(value).padStart(2, '0');
// }

// function getTimeComponents(time) {
//   /* * Оставшиеся дни: делим значение UTC на 1000 * 60 * 60 * 24, количество
//    * миллисекунд в одном дне (миллисекунды * секунды * минуты * часы) */
//   const days = pad(Math.floor(time / (1000 * 60 * 60 * 24)));

//   // /** Оставшиеся часы: получаем остаток от предыдущего расчета с помощью оператора
//   //  * остатка % и делим его на количество миллисекунд в одном часе
//   //  * (1000 * 60 * 60 = миллисекунды * минуты * секунды)*/
//   const hours = pad(
//     Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
//   );

//   // /* * Оставшиеся минуты: получаем оставшиеся минуты и делим их на количество
//   //  * миллисекунд в одной минуте (1000 * 60 = миллисекунды * секунды) */
//   const mins = pad(Math.floor((time % (1000 * 60 * 60)) / (1000 * 60)));

//   // /** Оставшиеся секунды: получаем оставшиеся секунды и делим их на количество
//   //  * миллисекунд в одной секунде (1000)*/
//   const secs = pad(Math.floor((time % (1000 * 60)) / 1000));
//   return { days, hours, mins, secs };
// }
