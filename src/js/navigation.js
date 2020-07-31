class Navigation {
  constructor() {
    this.home_library = Array.from(document.querySelectorAll('.header__navItem'));
    this.addToWatched = document.querySelector('.film__btn--favorite');
    this.addToQueue = document.querySelector('.film__btn--queue');
    this.detailsPageNone = document.querySelector('.film');
    this.filmLibraryPageNone = document.querySelector('.library');
    this.favoriteBtn = Array.from(document.querySelectorAll('.library__item'))[0];
    this.queueBtn = Array.from(document.querySelectorAll('.library__item'))[1];
    this.logo = document.querySelector('.header__logo');
    this.formWrap = document.querySelector('.form-wrap');
    this.movieWrap = document.querySelector('.movies-wrap');
    this.list = document.querySelector('[data-page="home"]');
    this.listLib = document.querySelector('[data-page="library"]');
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
    
  }

  init() {
    this.activeHomePage();
    this.addToQueue.addEventListener('click', () => detailsPage.toggleToQueue());
    this.addToWatched.addEventListener('click', () => detailsPage.toggleToWatched());
    this.list.addEventListener('click', () => this.activeDetailsPage());
    this.listLib.addEventListener('click', () => this.activeDetailsPage());
    this.home_library[0].addEventListener('click', () => this.activeHomePage());
    this.home_library[1].addEventListener('click', () => {this.activeLibraryPage();filmLibraryPage.drawFilmList('Watched')});
    this.logo.addEventListener('click', () => this.activeHomePage());
    this.favoriteBtn.addEventListener('click', () => filmLibraryPage.drawFilmList('Watched'));
    this.queueBtn.addEventListener('click', () => filmLibraryPage.drawFilmList('Queue'));
  }
}

  const navigationPage = new Navigation();

  navigationPage.init();