import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const form = document.querySelector('.form');

form.addEventListener('submit', onSubmit);

function onSubmit(event) {
  event.preventDefault();
  const delay = Number(event.target.elements.delay.value);
  const state = event.target.elements.state.value;

  setTimeout(() => {
    new Promise((resolve, reject) => {
      if (state === 'fulfilled') {
        resolve(delay);
      } else {
        reject(delay);
      }
    })
      .then(delay => {
        iziToast.success({
          icon: '',
          message: `✅ Fulfilled promise in ${delay}ms`,
          backgroundColor: '#59a10d',
          messageColor: '#fff',
          messageSize: '16px',
          position: 'topRight',
          maxWidth: '383px',
          close: false,
        });
      })
      .catch(delay => {
        iziToast.error({
          icon: '',
          message: `❌ Rejected promise in ${delay}ms`,
          backgroundColor: '#ef4040',
          messageColor: '#fff',
          messageSize: '16px',
          position: 'topRight',
          maxWidth: '383px',
          close: false,
        });
      });
  }, delay);

  event.currentTarget.reset();
}
