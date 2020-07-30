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
  }
  toggleToQueue() {

    console.log('toggleToQueue');
    // this.localStorageData = localStorage.getItem('filmsQueue');
    // this.localStorageData !== null? this.filmsQueueArr.push(...JSON.parse(this.localStorageData)) : null;
    // this.filmsQueueArr.find(el => el.id === this.selectFilm.id)? this.filmsQueueArr = this.filmsQueueArr.filter(el => el.id !== this.selectFilm.id) : this.filmsQueueArr.push(this.selectFilm);
    // localStorage.setItem('filmsQueue', JSON.stringify(this.filmsQueueArr));
    // this.monitorButtonStatusText();
  }
  toggleToWatched() {
    console.log('toggleToWatched');
    // this.localStorageData = localStorage.getItem('filmsWatched');
    // this.localStorageData !== null? this.filmsWatchedArr.push(...JSON.parse(this.localStorageData)) : null;
    // if (this.filmsWatchedArr.find(el => el.id === this.selectFilm.id)) {
    //   this.filmsWatchedArr = this.filmsWatchedArr.filter(el => el.id !== this.electFilm.id);
    // } else {
    //   this.filmsWatchedArr.push(this.selectFilm);
    // }
    // localStorage.setItem('filmsWatched', JSON.stringify(this.filmsWatchedArr));
    // this.monitorButtonStatusText();
  }
  showDetails(selectFilm) {
    // console.log(selectFilm);
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
  }
  monitorButtonStatusText(selectFilm) {
    this.addQueueButton.textContent = 'Add to queue';
    this.addQueueButton.setAttribute('data-film', 'add')
    this.addWatchedButton.textContent = 'Add to watched';
    this.addWatchedButton.setAttribute('data-film', 'add')

    this.localStorageFilmsQueue = localStorage.getItem('filmsQueue');
    if (this.localStorageFilmsQueue && JSON.parse(this.localStorageFilmsQueue).find(el => el.id === selectFilm.id)){
        this.addQueueButton.setAttribute('data-film', 'delete');
        this.addQueueButton.textContent = 'Delete from queue';
    }
    this.localStorageFilmsWatched = localStorage.getItem('filmsWatched');
    if (this.localStorageFilmsWatched && JSON.parse(this.localStorageFilmsWatched).find(el => el.id === selectFilm.id)){
      this.addWatchedButton.setAttribute('data-film', 'delete');
      this.addWatchedButton.textContent = 'Delete from watched';
    }
  }
  getDetails(id) {
    this.options = `https://api.themoviedb.org/3/movie/${id}?api_key=${homePage.API_KEY}&language=${homePage.searchLang}&append_to_response=image`;
    fetch(this.options)
      .then(response => response.json())
      .then(data => {this.showDetails(data); localStorage.setItem('dataFilm', JSON.stringify(data));})
      .catch(error => console.log(error));
    // console.log(id);
  }
  init(){
    document.addEventListener('click', event => {
      if (event.target.parentNode.getAttribute('class') === 'list-items') {
        this.getDetails(event.target.parentNode.getAttribute('data-id'));
      }
    });
  }
}

const detailsPage = new details();

detailsPage.init();