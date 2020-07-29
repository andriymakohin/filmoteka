const inputSearch = document.querySelector('.search-film');
const btnNumber = document.querySelector('.page-number');
const btnPrev = document.querySelector('.js-btn-prev');
const btnNext = document.querySelector('.js-btn-next');
const listMuvie = document.querySelector('.listMuvie');
const API_KEY = '2f2663043f4e6e1c1ca2fc9d3ec31eb9';
const searchLang = 'uk-UA';
const urlApi = 'https://api.themoviedb.org/3/';
let value = '';
let page = 1;
let options = '';
let totalPages = 0;
let loadPage = true;
let typeUrl = 'movie/popular';

function getFilmsList(event) {
  value = inputSearch.value;
  event === 'playing' || event === 'popular' || event === 'top' || event === 'upcoming' || event === 'search'? page = 1 : null;
  if (event === 'prev') {
    if (page <= 1) {
      return;
    }
    page -= 1;
  }
  event === 'next' ? (page += 1) : null;
  !loadPage? options = `$&query=${value}` : null;
  fetch(getUrl(event, page) + options)
    .then(response => response.json())
    .then(data => {
      postList(data);
      plaginationPages(data.total_pages, page);
      btnNumber.textContent = `${page} з ${data.total_pages}`;
    })
    .catch(error => console.log(error));
}

function getUrl(params, page) {
  if (params === 'search') {typeUrl = 'search/collection'; listMuvie.style.display = "none"}
  if (params === 'playing') {typeUrl = 'movie/now_playing'; listMuvieActive(params); }
  if (params === 'popular') {typeUrl = 'movie/popular'; listMuvieActive(params); }
  if (params === 'top') {typeUrl = 'movie/top_rated'; listMuvieActive(params); }
  if (params === 'upcoming') {typeUrl = 'movie/upcoming'; listMuvieActive(params); }

  return `${urlApi}${typeUrl}?api_key=${API_KEY}&language=${searchLang}&page=${page}`;
}

function listMuvieActive(params) {
  document.querySelector('.listMuvie__item--active').classList.remove('listMuvie__item--active');
  document.querySelector('.listMuvie__item[data-type="'+params+'"]').classList.add('listMuvie__item--active');
}

function plaginationPages(totalPages, page) {
  btnNumber.disabled = true;
  if (totalPages === 1) {
    btnPrev.disabled = true;
    btnNext.disabled = true;
    return;
  }
  totalPages >= 2 ? (btnNext.disabled = false) : null;
  page === 1 ? (btnPrev.disabled = true) : (btnPrev.disabled = false);
  totalPages === page ? (btnNext.disabled = true) : null;
}

getFilmsList('popular');

document.addEventListener('keydown', event => {
  // console.log(event)
  if (event.keyCode === 13 && inputSearch.value !== "") {
    loadPage = false;
    event.preventDefault();
    getFilmsList('search');
  }
});
btnPrev.addEventListener('click', () => getFilmsList('prev'));
btnNext.addEventListener('click', () => getFilmsList('next'));
document.addEventListener('click', event => {
  if (event.target.getAttribute('data-type')) {
    getFilmsList(event.target.getAttribute('data-type'));
  }
});
