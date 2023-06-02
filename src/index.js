import { fetchBreeds, fetchCatByBreed } from './cat-api';
import Notiflix from 'notiflix';

const selectInput = document.querySelector('.breed-select');
const catInfo = document.querySelector('.cat-info');
const loader = document.querySelector('.loader');
const BASE_URL = 'https://api.thecatapi.com/v1';
const API_KEY =
  'live_lfENxiPGaY0a6qcZgiS3RiiTLgruthKJBycsUFYY9eByW3Q7f7yXXBefWJQaW5Xj';

loadPage();

function loadPage() {
  loader.style.display = 'block';
  selectInput.style.display = 'none';
  fetchBreeds()
    .then(data => {
      selectInput.innerHTML = markupSelect(data);
    })
    .catch(err =>
      Notiflix.Notify.failure(
        'Something went wrong while displaying this webpage. Please try reloading the page'
      )
    )
    .finally(() => {
      loader.style.display = 'none';
      selectInput.style.display = 'block';
    });
}

function markupSelect(arr) {
  return arr
    .map(({ id, name }) => `<option value=${id}>${name}</option>`)
    .join('');
}

selectInput.addEventListener('change', onSelectCat);

function onSelectCat(evt) {
  const selectedOption = selectInput.options[selectInput.selectedIndex];
  const selectedValue = selectedOption.value;
  selectInput.style.display = 'block';
  catInfo.style.display = 'none';
  loader.style.display = 'block';
  fetchCatByBreed(selectedValue)
    .then(data => {
      //   console.dir(data);
      loader.style.display = 'none';
      catInfo.innerHTML = markupCatInfo(data);
      catInfo.style.display = 'block';
    })
    .catch(err => {
      loader.style.display = 'none';
      Notiflix.Notify.failure(
        'Something went wrong while displaying this webpage. Please try reloading the page'
      );
    })
    .finally(() => {
      catInfo.style.display = 'flex';
    });
}

function markupCatInfo(arr) {
  return arr
    .map(
      breed =>
        `<img src="${breed.url}" alt="${breed.breeds[0].name}" width=400>
      <div class="cat-description"><h2>${breed.breeds[0].name}</h2>
      <p>${breed.breeds[0].description}</p>
      <p><span>Temperament:</span> ${breed.breeds[0].temperament}</p></div>`
    )
    .join('');
}
