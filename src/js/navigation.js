class navigation {
  constructor() {
    this.home_library = Array.from(document.querySelectorAll('.header-nav_item'));
    this.addToWatched = document.querySelector('.film__btn--favorite');
    this.addToQueue = document.querySelector('.film__btn--queue');
    this.detailsPageNone = document.querySelector('.film');
    this.filmLibraryPageNone = document.querySelector('.header-search__library');
    this.favoriteBtn = Array.from(document.querySelectorAll('.header-search__item'))[0];
    this.queueBtn = Array.from(document.querySelectorAll('.header-search__item'))[1];
    this.logo = document.querySelector('.header-logo');
    this.formWrap = document.querySelector('.form-wrap');
    this.movieWrap = document.querySelector('.movies-wrap');
    this.list = document.querySelector('[data-page="home"]');
    this.selectFilm = '';
  }

  activeHomePage() {
    this.movieWrap.classList.remove('display-section');
    this.detailsPageNone.classList.add('display-section');
    this.filmLibraryPageNone.classList.add('display-section');
    this.formWrap.classList.remove('display-section');

  }
  activeLibraryPage() {
    this.detailsPageNone.classList.add('display-section');
    this.detailsPageNone.classList.add('display-section')
    this.movieWrap.classList.add('display-section');
    this.filmLibraryPageNone.classList.remove('display-section');
  }
  
  activeDetailsPage() {
    this.movieWrap.classList.add('display-section');
    this.filmLibraryPageNone.classList.add('display-section');
    this.detailsPageNone.classList.remove('display-section');
    // monitorButtonStatusText(selectFilm);
    // showDetails(selectFilm);
  
    this.addToQueue.addEventListener('click', () => detailsPage.toggleToQueue());
    this.addToWatched.addEventListener('click', () => detailsPage.toggleToWatched());
  }

  init() {
    this.activeHomePage();
    this.list.addEventListener('click', () => this.activeDetailsPage());
    this.home_library[0].addEventListener('click', () => this.activeHomePage());
    this.home_library[1].addEventListener('click', () => this.activeLibraryPage());
    this.logo.addEventListener('click', () => this.activeHomePage());
    this.favoriteBtn.addEventListener('click', () => drawFilmList('filmsWatched'));
    this.queueBtn.addEventListener('click', () => drawFilmList('filmsQueue'));
  }
}

  const navigationPage = new navigation();

  navigationPage.init();
  

// const refs = {
//     home_library: Array.from(document.querySelectorAll('.header-nav_item')),
//     addToWatched: document.querySelector('film__btn--favorite'),
//     addToQueue: document.querySelector('.film__btn--queue'),
//     detailsPageNone: document.querySelector('.film'),
//     filmLibraryPageNone: document.querySelector('.header-search__library'),
//     favoriteBtn: Array.from(document.querySelectorAll('.header-search__item'))[0],
//     queueBtn: Array.from(document.querySelectorAll('.header-search__item'))[1],
//     logo: document.querySelector('.header-logo'),
//     formWrap: document.querySelector('.form-wrap'),
//     movieWrap: document.querySelector('.movies-wrap'),
//   };
//   const list = document.querySelector('[data-page="home"]');
//   list.addEventListener('click',activeDetailsPage);
//   let selectFilm;

// function activeHomePage() {
//   refs.movieWrap.classList.remove('display-section');
//   refs.detailsPageNone.classList.add('display-section');
//   refs.filmLibraryPageNone.classList.add('display-section');
//   refs.formWrap.classList.remove('display-section');
// }

// function activeLibraryPage() {
//   refs.detailsPageNone.classList.add('display-section');
//   refs.movieWrap.classList.add('display-section');
//   refs.filmLibraryPageNone.classList.remove('display-section');
// }

// function activeDetailsPage() {

//   refs.movieWrap.classList.add('display-section');
//   refs.filmLibraryPageNone.classList.add('display-section');
//   refs.detailsPageNone.classList.remove('display-section');
//   // monitorButtonStatusText(selectFilm);
//   // showDetails(selectFilm);

//   refs.addToQueue.addEventListener('click', detailsPage.toggleToQueue);
//   refs.addToWatched.addEventListener('click', detailsPage.toggleToWatched);
// }

// activeHomePage();

// refs.home_library[0].addEventListener('click', activeHomePage);
// refs.home_library[1].addEventListener('click', activeLibraryPage);
// refs.logo.addEventListener('click', activeHomePage);
  