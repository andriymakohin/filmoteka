class details {
  constructor() {
    this.textDetails = document.querySelector('#js-textDetails');
    this.img = document.querySelector('#js-detailsImg');
    this.title = document.querySelector('#js-detailsTitle');
    this.vote = document.querySelector('#js-vote');
    this.voteCount = document.querySelector('#js-voteCount');
    this.popularity = document.querySelector('#js-popularity');
    this.originalTitle = document.querySelector('#js-originalTitle');
    this.genre = document.querySelector('#js-genre');
    this.releaseDate = document.querySelector('#js-releaseDate');
    this.runTime = document.querySelector('#js-runTime');
    this.addQueueButton = document.querySelector('#js-addQueueButton'); 
    this.addWatchedButton = document.querySelector('#js-addWatchedButton');
    this.filmsQueueArr = [];
    this.filmsWatchedArr = [];
  };
  toggleToQueue() {
    this.filmObject = JSON.parse(localStorage.getItem('dataFilm'));
    this.filmObjects = JSON.parse(localStorage.getItem('filmsQueue'));
      if (this.filmObjects && this.filmObjects.find(item => item.id === this.filmObject.id)) {
        this.deleteIndex = this.filmObjects.indexOf(this.filmObjects.find(item => item.id === this.filmObject.id));
        this.filmObjects.splice(this.deleteIndex, 1);
        localStorage.setItem('filmsQueue', JSON.stringify(this.filmObjects));
        detailsPage.monitorButtonStatusText(this.filmObject);
        return;
    }
    this.newFilmObject = { backdrop_path: this.filmObject.backdrop_path, original_title: this.filmObject.original_title, id: this.filmObject.id, vote_average: this.filmObject.vote_average};
    if (this.filmObjects) {
      this.obj = JSON.parse(localStorage.getItem('filmsQueue'));
      localStorage.setItem('filmsQueue', JSON.stringify([...this.obj, this.newFilmObject]));
    } else {
      localStorage.setItem('filmsQueue', JSON.stringify([this.newFilmObject]));
  }
  detailsPage.monitorButtonStatusText(this.filmObject);
  };
  toggleToWatched() {
      this.filmObject = JSON.parse(localStorage.getItem('dataFilm'));
      this.filmObjects = JSON.parse(localStorage.getItem('filmsWatched'));
        if (this.filmObjects && this.filmObjects.find(item => item.id === this.filmObject.id)) {
          this.deleteIndex = this.filmObjects.indexOf(this.filmObjects.find(item => item.id === this.filmObject.id));
          this.filmObjects.splice(this.deleteIndex, 1);
          localStorage.setItem('filmsWatched', JSON.stringify(this.filmObjects));
          detailsPage.monitorButtonStatusText(this.filmObject);
          return;
      }
      this.newFilmObject = { backdrop_path: this.filmObject.backdrop_path, original_title: this.filmObject.original_title, id: this.filmObject.id, vote_average: this.filmObject.vote_average};
      if (this.filmObjects) {
        this.obj = JSON.parse(localStorage.getItem('filmsWatched'));
        localStorage.setItem('filmsWatched', JSON.stringify([...this.obj, this.newFilmObject]));
      } else {
        localStorage.setItem('filmsWatched', JSON.stringify([this.newFilmObject]));
    }
    detailsPage.monitorButtonStatusText(this.filmObject);
  };
  showDetails(selectFilm) {
    this.img.src = `https://image.tmdb.org/t/p/w500${selectFilm.poster_path}`;
    this.title.textContent = selectFilm.data;
    this.vote.textContent = selectFilm.vote_average;
    this.voteCount.textContent = selectFilm.vote_count;
    this.popularity.textContent = selectFilm.popularity;
    this.originalTitle.textContent = selectFilm.original_title;
    this.genre.innerHTML = selectFilm.genres
      .map(item => `<p>${item.name}</p>`)
      .join('');
    this.releaseDate.textContent = selectFilm.release_date;
    this.runTime.textContent = selectFilm.runtime;
    this.textDetails.textContent = selectFilm.overview;
    this.monitorButtonStatusText(selectFilm);
  };
  monitorButtonStatusText(selectFilm) {
    this.localStorageFilmsQueue = localStorage.getItem('filmsQueue');
    if (this.localStorageFilmsQueue && JSON.parse(this.localStorageFilmsQueue).find(el => el.id === selectFilm.id)){
        this.addQueueButton.textContent = 'Delete from queue';
    } else {
      this.addQueueButton.textContent = 'Add to queue';
    }
    this.localStorageFilmsWatched = localStorage.getItem('filmsWatched');
    if (this.localStorageFilmsWatched && JSON.parse(this.localStorageFilmsWatched).find(el => el.id === selectFilm.id)){
      this.addWatchedButton.textContent = 'Delete from watched';
    } else {
      this.addWatchedButton.textContent = 'Add to watched';
    }
  };
  getDetails(id) {
    this.options = `https://api.themoviedb.org/3/movie/${id}?api_key=${homePage.API_KEY}&language=${homePage.searchLang}&append_to_response=image`;
    fetch(this.options)
      .then(response => response.json())
      .then(data => {
        this.showDetails(data); localStorage.setItem('dataFilm', JSON.stringify(data));})
      .catch(error => console.log(error));

  };
  init(){
    this.monitorButtonStatusText(1);
    document.addEventListener('click', event => {
      if (event.target.parentNode.getAttribute('class') === 'list-items') {
        this.getDetails(event.target.parentNode.getAttribute('data-id'));
      }
    });
  };
}

const detailsPage = new details();

detailsPage.init();