class Details {
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
    this.addWatchedImg = document.querySelector('.film__btnVideo--img');
    this.addQueueImg = document.querySelector('.film__btnCalendar--img');
    this.filmsQueueArr = [];
    this.filmsWatchedArr = [];
    this.setNameLocalStrage = ['Queue', 'Watched', 'dataFilm']
  };
  toggleToQueue() {
    this.filmObject = JSON.parse(localStorage.getItem(this.setNameLocalStrage[2]));
    this.getfilmSave = JSON.parse(localStorage.getItem('films'+this.setNameLocalStrage[0]));
      if (this.getfilmSave && this.getfilmSave.find(item => item.id === this.filmObject.id)) {
        this.deleteIndex = this.getfilmSave.indexOf(this.getfilmSave.find(item => item.id === this.filmObject.id));
        this.getfilmSave.splice(this.deleteIndex, 1);
        localStorage.setItem('films'+this.setNameLocalStrage[0], JSON.stringify(this.getfilmSave));
        detailsPage.monitorButtonStatusText(this.filmObject);
        return;
    }
    this.newFilmObject = { backdrop_path: this.filmObject.backdrop_path, original_title: this.filmObject.original_title, id: this.filmObject.id, vote_average: this.filmObject.vote_average};
    if (this.getfilmSave) {
      this.obj = JSON.parse(localStorage.getItem('films'+this.setNameLocalStrage[0]));
      localStorage.setItem('films'+this.setNameLocalStrage[0], JSON.stringify([...this.obj, this.newFilmObject]));
    } else {
      localStorage.setItem('films'+this.setNameLocalStrage[0], JSON.stringify([this.newFilmObject]));
  }
  detailsPage.monitorButtonStatusText(this.filmObject);
  };
  toggleToWatched() {
      this.filmObject = JSON.parse(localStorage.getItem(this.setNameLocalStrage[2]));
      this.getfilmSave = JSON.parse(localStorage.getItem('films'+this.setNameLocalStrage[1]));
        if (this.getfilmSave && this.getfilmSave.find(item => item.id === this.filmObject.id)) {
          this.deleteIndex = this.getfilmSave.indexOf(this.getfilmSave.find(item => item.id === this.filmObject.id));
          this.getfilmSave.splice(this.deleteIndex, 1);
          localStorage.setItem('films'+this.setNameLocalStrage[1], JSON.stringify(this.getfilmSave));
          detailsPage.monitorButtonStatusText(this.filmObject);
          return;
      }
      this.newFilmObject = { backdrop_path: this.filmObject.backdrop_path, original_title: this.filmObject.original_title, id: this.filmObject.id, vote_average: this.filmObject.vote_average};
      if (this.getfilmSave) {
        this.obj = JSON.parse(localStorage.getItem('films'+this.setNameLocalStrage[1]));
        localStorage.setItem('films'+this.setNameLocalStrage[1], JSON.stringify([...this.obj, this.newFilmObject]));
      } else {
        localStorage.setItem('films'+this.setNameLocalStrage[1], JSON.stringify([this.newFilmObject]));
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
    this.localStorageFilmsQueue = localStorage.getItem('films'+this.setNameLocalStrage[0]);
    if (this.localStorageFilmsQueue && JSON.parse(this.localStorageFilmsQueue).find(el => el.id === selectFilm.id)){
        this.addQueueImg.setAttribute('src', './images/details-page-icon/calendar-minus.png');
        this.addQueueButton.lastChild.textContent = 'Delete from queue';
    } else {
      this.addQueueImg.setAttribute('src', './images/details-page-icon/calendar.jpg');
      this.addQueueButton.lastChild.textContent = 'Add to queue';
    }
    this.localStorageFilmsWatched = localStorage.getItem('films'+this.setNameLocalStrage[1]);
    if (this.localStorageFilmsWatched && JSON.parse(this.localStorageFilmsWatched).find(el => el.id === selectFilm.id)){
      this.addWatchedImg.setAttribute('src', './images/details-page-icon/delete-video.png');
      this.addWatchedButton.lastChild.textContent = 'Delete from watched';
    } else {
      this.addWatchedImg.setAttribute('src', './images/details-page-icon/video.jpg');
      this.addWatchedButton.lastChild.textContent = 'Add to watched';
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
    document.addEventListener('click', event => {
      if (event.target.parentNode.getAttribute('class') === 'list__items') {
        this.getDetails(event.target.parentNode.getAttribute('data-id'));
      }
    });
  };
}

const detailsPage = new Details();

detailsPage.init();