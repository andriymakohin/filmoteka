class libraryPage {
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
    this.movieMasyv = this.movieMasyv.map(obj => this.createLibraryCardFunc(obj)).join('');
    this.libraryList.innerHTML = this.movieMasyv;
  }
  createLibraryCardFunc(obj) {
    obj.backdrop_path? this.src = this.pageUlr+obj.backdrop_path : null;
    obj.poster_path? this.src = this.pageUlr+obj.poster_path : null;
  
    return `<li class="list__items" data-id="${obj.id}">
          <img src="${this.src}" alt="${obj.original_title}" class="list__itemsImg">
          <div class="list__layout">
              <p class="list__itemsTitle">${obj.original_title}</p>
          </div>   
          </li>`;
  }
}

const filmLibraryPage = new libraryPage();