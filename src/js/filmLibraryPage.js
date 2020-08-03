class LibraryPage {
  constructor() {
    this.libraryList = document.querySelector('[data-page="library"]');
    this.pageUlr = 'https://image.tmdb.org/t/p/w500/';
  }
  drawFilmList(params) {
    this.movieMasyv = JSON.parse(localStorage.getItem('films'+params));
    document.querySelector('.library__item--active')? document.querySelector('.library__item--active').classList.remove('library__item--active') : null;
    if (params === 'Watched') {navigationPage.favoriteBtn.classList.add('library__item--active')} else {navigationPage.queueBtn.classList.add('library__item--active')}
    this.libraryList.innerHTML = 'You do not have to '+params+' movies to watch. Add them.';
    if (!this.movieMasyv || this.movieMasyv.length ===0) {return;}
    this.movieMasyv = this.movieMasyv.map(obj => loadPage.createList(obj)).join('');
    this.libraryList.innerHTML = this.movieMasyv;
  }
}

const filmLibraryPage = new LibraryPage();