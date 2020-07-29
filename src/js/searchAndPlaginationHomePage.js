const inputSearch = document.querySelector('.search-film');
const btnNumber = document.querySelector('.page-number');
const btnPrev = document.querySelector('.js-btn-prev');
const btnNext = document.querySelector('.js-btn-next');
const btnPages = document.querySelector('.pages');
const myKey = '2f2663043f4e6e1c1ca2fc9d3ec31eb9';
const urlSearch = 'https://api.themoviedb.org/3/search/collection?';
const urlPopular = 'https://api.themoviedb.org/3/movie/popular?';
const searchLang = 'en-US';
let value;
let page = 1;
let options;
let totalPages = 0;
let loadPage = true;

function getFilmsList(event) {
  value = inputSearch.value;
  if (event === 'next') {
    page += 1;
  } else if (event === 'prev') {
    if (page <= 1) {
      return;
    } else {
      page -= 1;
    }
  } else {
    page = 1;
  }
  if (loadPage) {
    options = `${urlPopular}api_key=${myKey}&language=${searchLang}&page=${page}`;
  } else {
    options = `${urlSearch}api_key=${myKey}&language=${searchLang}&query=${value}&page=${page}`;
  }
  fetch(options)
    .then(response => response.json())
    .then(data => {
      postList(data);
      plaginationPages(data.total_pages, page);
      btnNumber.textContent = `${data.page} з ${data.total_pages}`;
    })
    .catch(error => console.log(error));
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

getFilmsList();

document.addEventListener('keydown', event => {
  // console.log(event.code)
  if (event.code === 'Enter') {
    loadPage = false;
    event.preventDefault();
    getFilmsList();
  }
});
btnPrev.addEventListener('click', () => getFilmsList('prev'));
btnNext.addEventListener('click', () => getFilmsList('next'));