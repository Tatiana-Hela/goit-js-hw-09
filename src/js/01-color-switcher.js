// HTML містить кнопки «Start» і «Stop».

// <button type="button" data-start>Start</button>
// <button type="button" data-stop>Stop</button>

// Напиши скрипт, який після натискання кнопки «Start»,
//  раз на секунду змінює колір фону < body > на випадкове значення,
// використовуючи інлайн стиль.
// Натисканням на кнопку «Stop» зміна кольору фону повинна зупинятися.

// УВАГА
// Враховуй, що на кнопку «Start» можна натиснути нескінченну кількість разів.
//  Зроби так, щоб доки зміна теми запущена, кнопка «Start» була неактивною(disabled).

// Для генерування випадкового кольору використовуй функцію getRandomHexColor.

import '../css/common.css';

const PROMPT_DELAY = 1000;
let timerId = null;

const refs = {
  startBtnEL: document.querySelector('button[data-start]'),
  stopBtnEL: document.querySelector('button[data-stop]'),
};
refs.startBtnEL.addEventListener('click', () => {
  timerId = setInterval(() => {
    document.body.style.backgroundColor = getRandomHexColor();
  }, PROMPT_DELAY);
});

refs.stopBtnEL.setAttribute('disabled', true);

refs.startBtnEL.addEventListener('click', () => {
  refs.startBtnEL.setAttribute('disabled', true);
  refs.stopBtnEL.removeAttribute('disabled');
});

refs.stopBtnEL.addEventListener('click', () => {
  clearInterval(timerId);
});

refs.stopBtnEL.addEventListener('click', () => {
  refs.startBtnEL.removeAttribute('disabled');
  refs.stopBtnEL.setAttribute('disabled', true);
});

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}
