import { Notify } from 'notiflix/build/notiflix-notify-aio';

const form = document.querySelector('.form');

form.addEventListener('submit', onCreateBtn);

function onCreateBtn(event) {
  event.preventDefault();
  
  const {elements: {delay, step, amount}} = event.currentTarget;
  
  let totalDelay = Number(delay.value);
  for (let i = 1; i <= amount.value; i++) {
    const position = i;
    createPromise(position, totalDelay).then((result) => {
      Notify.success(result);
    })
    .catch((error) => {
      Notify.failure(error);
    });
    totalDelay += Number(step.value);
  }
}

function createPromise(position, delay) {
    return new Promise ((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;
    setTimeout (() => {
      if (shouldResolve) {
        resolve(`✅ Fulfilled promise ${position} in ${delay}ms`);
      } else {
        reject(`❌ Rejected promise ${position} in ${delay}ms`);
      }
    }, delay)
  })

}

