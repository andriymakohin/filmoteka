const addQueueButton = document.querySelector('#js-addQueueButton');
const addWatchedButton = document.querySelector('#js-addWatchedButton');

function toggleToQueue() {
  let filmsQueueArr = [];
  let localStorageData = localStorage.getItem('filmsQueue');
  if (localStorageData !== null) {
    filmsQueueArr.push(...JSON.parse(localStorageData));
  }
  if (filmsQueueArr.find(el => el.id === selectFilm.id)) {
    filmsQueueArr = filmsQueueArr.filter(el => el.id !== selectFilm.id);
  } else {
    filmsQueueArr.push(selectFilm);
  }
  localStorage.setItem('filmsQueue', JSON.stringify(filmsQueueArr));
  monitorButtonStatusText();
}

function toggleToWatched() {
  let filmsWatchedArr = [];
  let localStorageData = localStorage.getItem('filmsWatched');
  if (localStorageData !== null) {
    filmsWatchedArr.push(...JSON.parse(localStorageData));
  }
  if (filmsWatchedArr.find(el => el.id === selectFilm.id)) {
    filmsWatchedArr = filmsWatchedArr.filter(el => el.id !== selectFilm.id);
  } else {
    filmsWatchedArr.push(selectFilm);
  }
  localStorage.setItem('filmsWatched', JSON.stringify(filmsWatchedArr));
  monitorButtonStatusText();
}

function showDetails(selectFilm) {
  // console.log(selectFilm);
  let img = document.querySelector('#js-detailsImg');
  img.src = `https://image.tmdb.org/t/p/w500${selectFilm.poster_path}`;

  let title = document.querySelector('#js-detailsTitle');
  title.textContent = selectFilm.data;

  let vote = document.querySelector('#js-vote');
  vote.textContent = selectFilm.vote_average;

  let voteCount = document.querySelector('#js-voteCount');
  voteCount.textContent = selectFilm.vote_count;

  let popularity = document.querySelector('#js-popularity');
  popularity.textContent = selectFilm.popularity;

  let originalTitle = document.querySelector('#js-originalTitle');
  originalTitle.textContent = selectFilm.original_title;

  let genre = document.querySelector('#js-genre');
  genre.innerHTML = selectFilm.genres
    .map(item => `<p>${item.name}</p>`)
    .join('');

  let releaseDate = document.querySelector('#js-releaseDate');
  releaseDate.textContent = selectFilm.release_date;

  let runTime = document.querySelector('#js-runTime');
  runTime.textContent = selectFilm.runtime;

  let textDetails = document.querySelector('#js-textDetails');
  textDetails.textContent = selectFilm.overview;

  monitorButtonStatusText();
}

function monitorButtonStatusText() {
  let localStorageFilmsQueue = localStorage.getItem('filmsQueue');
  localStorageFilmsQueue === null
    ? (addQueueButton.textContent = 'Add to queue')
    : JSON.parse(localStorageFilmsQueue).find(el => el.id === selectFilm.id)
    ? (addQueueButton.textContent = 'Delete from queue')
    : (addQueueButton.textContent = 'Add to queue');

  let localStorageFilmsWatched = localStorage.getItem('filmsWatched');
  localStorageFilmsWatched === null
    ? (addWatchedButton.textContent = 'Add to watched')
    : JSON.parse(localStorageFilmsWatched).find(el => el.id === selectFilm.id)
    ? (addWatchedButton.textContent = 'Delete from watched')
    : (addWatchedButton.textContent = 'Add to watched');
}

document.addEventListener('click', event => {
  if (event.target.parentNode.getAttribute('class') === 'list-items') {
    getDetails(event.target.parentNode.getAttribute('data-id'));
  }
});

function getDetails(id) {
  let options = `https://api.themoviedb.org/3/movie/${id}?api_key=${homePage.API_KEY}&language=${homePage.searchLang}&append_to_response=image`;
  fetch(options)
    .then(response => response.json())
    .then(data => {showDetails(data);
                    let DATA = data;})
    .catch(error => console.log(error));
  // console.log(id);
}
