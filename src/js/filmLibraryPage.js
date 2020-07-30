class libraryPage {
  constructor() {
    this.libraryList = document.querySelector('.library__list');
    this.pageUlr = 'https://image.tmdb.org/t/p/w500/';
  }
  drawFilmList(params) {
    this.movieMasyv = JSON.parse(localStorage.getItem(params));
    this.movieMasyv = this.movieMasyv.map(obj => this.createLibraryCardFunc(obj)).join('');
    this.libraryList.innerHTML = this.movieMasyv;
  }
  createLibraryCardFunc(obj) {
    obj.backdrop_path? this.src = this.pageUlr+obj.backdrop_path : null;
    obj.poster_path? this.src = this.pageUlr+obj.poster_path : null;
  
    return `<li class="list-items" data-id="${obj.id}">
          <img src="${this.src}" alt="${obj.original_title}" class="list-items__img">
          <div class="layout">
              <p class="list-items__title">${obj.original_title}</p>
          </div>   
          </li>`;
  }
}

const filmLibraryPage = new libraryPage();