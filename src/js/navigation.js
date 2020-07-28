const refs = {
    home_library: Array.from(document.querySelectorAll('.header-nav_item')),
    addToWatched: document.querySelector('film__btn--favorite'),
    addToQueue: document.querySelector('.film__btn--queue'),
    // main: document.querySelector('.main'),
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

  let selectFilm;

function activeHomePage() {
  refs.movieWrap.classList.remove('display-section');
  refs.detailsPageNone.classList.add('display-section');
  refs.filmLibraryPageNone.classList.add('display-section');
  refs.navbarHome.classList.add('header-nav__item--active');
  refs.navbarLibrary.classList.remove('header-nav__item--active');
  refs.formWrap.classList.remove('display-section');
  refs.thumbs.classList.remove('display-section');
  refs.thumbs.classList.remove('display-section');

  // refs.addToQueue.removeEventListener('click', toggleToQueue);
  // refs.addToWatched.removeEventListener('click', toggleToWatched);
}

function activeLibraryPage() {
  refs.detailsPageNone.classList.add('display-section');
  refs.movieWrap.classList.add('display-section');
  refs.filmLibraryPageNone.classList.remove('display-section');

  refs.navbarHome.classList.remove('header-nav__item--active');
  refs.navbarLibrary.classList.add('header-nav__item--active');
//   drawQueueFilmList();

  refs.queueBtn.classList.add('header-search__item--active');
//   refs.favoriteBtn.addEventListener('click', drawWatchedFilmList);

//   refs.addToQueue.removeEventListener('click', toggleToQueue);
//   refs.addToWatched.removeEventListener('click', toggleToWatched);
}

function activeDetailsPage(e) {
  if (!e.target.closest('li')) return;

  const movieId = e.target.closest('li').id;

  const itsLibraryFilm = e.currentTarget.dataset.page !== 'home';

  refs.movieWrap.classList.add('display-section');
  refs.filmLibraryPageNone.classList.add('display-section');
  refs.detailsPageNone.classList.remove('display-section');

  if (itsLibraryFilm) {
    selectFilm =
      JSON.parse(localStorage.getItem('filmsQueue')).find(
        obj => obj.id === Number(movieId),
      ) ||
      JSON.parse(localStorage.getItem('filmsWatched')).find(
        obj => obj.id === Number(movieId),
      );
  } else {
    selectFilm = renderFilms.find(film => film.id === Number(movieId));
  }
  monitorButtonStatusText();
  showDetails(selectFilm);

  refs.addToQueue.addEventListener('click', toggleToQueue);
  refs.addToWatched.addEventListener('click', toggleToWatched);
}

// activeHomePage();

refs.home_library[0].addEventListener('click', activeHomePage);
refs.home_library[1].addEventListener('click', activeLibraryPage);
refs.logo.addEventListener('click', activeHomePage);
  