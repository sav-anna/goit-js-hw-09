// Завдання 1 - перемикач кольорів
// =========================================================================
// HTML містить кнопки «Start» і «Stop».

// <button type="button" data-start>Start</button>
// <button type="button" data-stop>Stop</button>

// Напиши скрипт, який після натискання кнопки «Start»,
// раз на секунду змінює колір фону < body > на випадкове значення,
// використовуючи інлайн стиль.
// Натисканням на кнопку «Stop» зміна кольору фону повинна зупинятися.
// Для генерування випадкового кольору використовуй функцію getRandomHexColor
// ==========================================================================

const startBtn = document.querySelector('button[data-start]');
const stopBtn = document.querySelector('button[data-stop]');

startBtn.addEventListener('click', startColorOnBody);
stopBtn.addEventListener('click', stopColorOnBody);

function startColorOnBody() {
  timeColor = setInterval(() => {
    const randomColor = getRandomHexColor();
    document.body.style.backgroundColor = randomColor;
    startBtn.disabled = true;
  }, 1000);
}

function stopColorOnBody() {
  clearInterval(timeColor);
  startBtn.disabled = false;
}
function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}
