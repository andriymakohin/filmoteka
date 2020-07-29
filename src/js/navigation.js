const refs = {
    home_library: Array.from(document.querySelectorAll('.header-nav_item')),
    addToWatched: document.querySelector('film__btn--favorite'),
    addToQueue: document.querySelector('.film__btn--queue'),
    detailsPageNone: document.querySelector('.film'),
    filmLibraryPageNone: document.querySelector('.header-search__library'),
    favoriteBtn: Array.from(document.querySelectorAll('.header-search__item'))[0],
    queueBtn: Array.from(document.querySelectorAll('.header-search__item'))[1],
    logo: document.querySelector('.header-logo'),
    formWrap: document.querySelector('.form-wrap'),
    movieWrap: document.querySelector('.movies-wrap'),
  };
  const list = document.querySelector('[data-page="home"]');
  list.addEventListener('click',activeDetailsPage);
  let selectFilm;

function activeHomePage() {
  refs.movieWrap.classList.remove('display-section');
  refs.detailsPageNone.classList.add('display-section');
  refs.filmLibraryPageNone.classList.add('display-section');
  refs.formWrap.classList.remove('display-section');
  // refs.addToQueue.removeEventListener('click', toggleToQueue);
  // refs.addToWatched.removeEventListener('click', toggleToWatched);
}

function activeLibraryPage() {
  refs.detailsPageNone.classList.add('display-section');
  refs.movieWrap.classList.add('display-section');
  refs.filmLibraryPageNone.classList.remove('display-section');
  refs.favoriteBtn.addEventListener('click', drawWatchedFilmList);
  // drawQueueFilmList();

  // refs.addToQueue.removeEventListener('click', toggleToQueue);
  // refs.addToWatched.removeEventListener('click', toggleToWatched);
}

function activeDetailsPage() {

  refs.movieWrap.classList.add('display-section');
  refs.filmLibraryPageNone.classList.add('display-section');
  refs.detailsPageNone.classList.remove('display-section');
  // monitorButtonStatusText();
  // showDetails(selectFilm);

  // refs.addToQueue.addEventListener('click', toggleToQueue);
  // refs.addToWatched.addEventListener('click', toggleToWatched);
}

activeHomePage();

refs.home_library[0].addEventListener('click', activeHomePage);
refs.home_library[1].addEventListener('click', activeLibraryPage);
refs.logo.addEventListener('click', activeHomePage);
  