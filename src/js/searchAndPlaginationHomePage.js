class search {
  constructor(apiKey) {
    this.inputSearch = document.querySelector('.search-film');
    this.btnNumber = document.querySelector('.page-number');
    this.btnPrev = document.querySelector('.js-btn-prev');
    this.btnNext = document.querySelector('.js-btn-next');
    this.listMuvie = document.querySelector('.listMuvie');
    this.API_KEY = apiKey;
    this.searchLang = 'uk-UA';
    this.urlApi = 'https://api.themoviedb.org/3/';
    this.value = '';
    this.page = 1;
    this.options = '';
    this.setloadPage = true;
    this.typeUrl = 'movie/popular';
  }
  getFilmsList(event) {
    event? this.page = 1 : null;
    if (!this.setloadPage) {
      if (this.check(this.inputSearch.value)) {this.value = this.inputSearch.value;} else {return;}
      this.options = `$&query=${this.value}`;
    }
    fetch(this.getUrl(event) + this.options)
      .then(response => response.json())
      .then(data => {
        postList(data);
        this.plaginationPages(data.total_pages, this.page);
        this.btnNumber.textContent = `${this.page} з ${data.total_pages}`;
      })
      .catch(error => console.log(error));
  }
  check(item){
    if (item === "" || item === " ") {return false}
    return true;
  }
  setPrevNext(params) {
    if (params === 'prev') {
      if (this.page <= 1) {
        return;
      }
      this.page -= 1;
    }
    params === 'next' ? (this.page += 1) : null;
  
    this.getFilmsList()
  }
  getUrl(params) {
    if (params === 'search') {this.typeUrl = 'search/collection'; this.listMuvie.style.display = "none"}
    params === 'playing'? this.typeUrl = 'movie/now_playing' : null;
    params === 'popular'? this.typeUrl = 'movie/popular' : null;
    params === 'top'? this.typeUrl = 'movie/top_rated' : null;
    params === 'upcoming'? this.typeUrl = 'movie/upcoming' : null;
  
    if (params === 'playing' || params === 'popular' || params === 'top' || params === 'upcoming') {
      localStorage.setItem('loadPage', params);
      this.listMuvie.style.display = "flex"; 
      this.listMuvieActive(params);
    };
  
    return `${this.urlApi}${this.typeUrl}?api_key=${this.API_KEY}&language=${this.searchLang}&page=${this.page}`;
  }
  listMuvieActive(params) {
    document.querySelector('.listMuvie__item--active')? document.querySelector('.listMuvie__item--active').classList.remove('listMuvie__item--active') : null;
    document.querySelector('.listMuvie__item[data-type="'+params+'"]').classList.add('listMuvie__item--active');
  }
  plaginationPages(totalPages) {
    this.btnNumber.disabled = true;
    if (totalPages === 1) {
      this.btnPrev.disabled = true;
      this.btnNext.disabled = true;
      return;
    }
    totalPages >= 2 ? this.btnNext.disabled = false : null;
    this.page === 1 ? this.btnPrev.disabled = true : this.btnPrev.disabled = false;
    totalPages === this.page ? this.btnNext.disabled = true : null;
  }
  init() {
    this.getFilmsList(localStorage.getItem('loadPage')? localStorage.getItem('loadPage') : 'popular');

    document.addEventListener('keydown', event => {
      // console.log(event)
      if (event.keyCode === 13) {
        this.setloadPage = false;
        event.preventDefault();
        this.getFilmsList('search');
      }
    });
    this.btnPrev.addEventListener('click', () => this.setPrevNext('prev'));
    this.btnNext.addEventListener('click', () => this.setPrevNext('next'));
    document.addEventListener('click', event => {
      if (event.target.getAttribute('data-type')) {
        this.getFilmsList(event.target.getAttribute('data-type'));
      }
    });
  }
}

const homePage = new search('2f2663043f4e6e1c1ca2fc9d3ec31eb9');

homePage.init();

// alert(homePage.API_KEY)