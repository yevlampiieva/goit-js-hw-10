const BASE_URL = 'https://api.thecatapi.com/v1';
const API_KEY =
  'live_lfENxiPGaY0a6qcZgiS3RiiTLgruthKJBycsUFYY9eByW3Q7f7yXXBefWJQaW5Xj';

function fetchBreeds(id = '', name = '') {
  const params = new URLSearchParams({
    api_key: API_KEY,
  });

  return fetch(`${BASE_URL}/breeds?${params}`).then(resp => {
    // console.log(resp);
    if (!resp.ok) {
      throw new Error(resp.statusText);
    }
    return resp.json();
  });
}

function fetchCatByBreed(breedId) {
  return fetch(
    `${BASE_URL}/images/search?api_key=${API_KEY}&breed_ids=${breedId}`
  ).then(resp => {
    // console.log(resp);
    if (!resp.ok) {
      throw new Error(resp.statusText);
    }
    return resp.json();
  });
}

export { fetchBreeds, fetchCatByBreed };
