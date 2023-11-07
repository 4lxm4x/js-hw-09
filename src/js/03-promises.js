import { Notify } from 'notiflix/build/notiflix-notify-aio';

const refs = {
  delay: document.querySelector('[name=delay]'),
  step: document.querySelector('[name=step]'),
  amount: document.querySelector('[name=amount]'),
  createBtn: document.querySelector('button'),
};

refs.createBtn.addEventListener('click', create);

function create(event) {
  event.preventDefault();
  const delay = parseInt(refs.delay.value);
  const step = parseInt(refs.step.value);
  const amount = parseInt(refs.amount.value);
  let currentDelay = delay;
  for (i = 1; i <= amount; i++) {
    //console.log(typeof delay);
    createPromise(i, currentDelay)
      .then(({ position, delay }) => {
        Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
      });
    currentDelay = currentDelay + step;
  }
}

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        // Fulfill
        resolve({ position, delay });
      } else {
        // Reject
        reject({ position, delay });
      }
    }, delay);
  });
}
