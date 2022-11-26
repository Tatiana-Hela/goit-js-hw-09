// Напиши скрипт, який на момент сабміту форми викликає функцію
// createPromise(position, delay) стільки разів,
//   скільки ввели в поле amount.
//   Під час кожного виклику передай їй номер промісу(position),
//   що створюється, і затримку, враховуючи першу затримку(delay),
//     введену користувачем,
//   і крок(step).
import Notiflix from 'notiflix';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
const formRef = document.querySelector('.form');

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;

    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}

function onFormSubmit(event) {
  event.preventDefault();
  let {
    elements: { delay, amount, step },
  } = event.currentTarget;
  let elDelay = Number(delay.value);
  let elStep = Number(step.value);
  let elAmount = Number(amount.value);
  for (let position = 0; position <= elAmount; position += 1) {
    createPromise(position, elDelay)
      .then(({ position, delay }) => {
        Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
      });
    elDelay += elStep;
  }
  event.currentTarget.reset();
}

formRef.addEventListener('submit', onFormSubmit);
