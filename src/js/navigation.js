const refs = {
    home_library: Array.from(document.querySelectorAll('.header-nav_item')),
    addToWatched: document.querySelector('film__btn--favorite'),
    addToQueue: document.querySelector('.film__btn--queue'),
    detailsPageNone: document.querySelector('.film'),
    filmLibraryPageNone: document.querySelector('.header-search__library'),
    thumbsNextBtn: document.querySelector('.js-btn-next'),
    favoriteBtn: Array.from(document.querySelectorAll('.header-search__item'))[0],
    queueBtn: Array.from(document.querySelectorAll('.header-search__item'))[1],
    filmItem: document.querySelector('.list-items'),
    logo: document.querySelector('.header-logo'),
    navbarHome: document.querySelector('[data-item=home]'),
    navbarLibrary: document.querySelector('[data-item=library]'),
    formWrap: document.querySelector('.form-wrap'),
    thumbs: document.querySelector('.btns'),
    movieWrap: document.querySelector('.movies-wrap'),
  };
  const list = document.querySelector('[data-page="home"]');
  list.addEventListener('click',activeDetailsPage);
  list.innerHTML = '';
  let selectFilm, renderFilms;
  renderFilms = [...array.results];

function activeHomePage() {
  refs.movieWrap.classList.remove('display-section');
  refs.detailsPageNone.classList.add('display-section');
  refs.filmLibraryPageNone.classList.add('display-section');
  refs.navbarHome.classList.add('header-nav__item--active');
  refs.navbarLibrary.classList.remove('header-nav__item--active');
  refs.formWrap.classList.remove('display-section');

  // refs.addToQueue.removeEventListener('click', toggleToQueue);
  // refs.addToWatched.removeEventListener('click', toggleToWatched);
}

function activeLibraryPage() {
  refs.detailsPageNone.classList.add('display-section');
  refs.movieWrap.classList.add('display-section');
  refs.filmLibraryPageNone.classList.remove('display-section');
  refs.navbarHome.classList.remove('header-nav__item--active');
  refs.navbarLibrary.classList.add('header-nav__item--active');
  // drawQueueFilmList();

  refs.queueBtn.classList.add('header-search__item--active');
  refs.favoriteBtn.addEventListener('click', drawWatchedFilmList);

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
  