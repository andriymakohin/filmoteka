const inputSearch = document.querySelector('.search-film'); 
const btnNumber = document.querySelector('.page-number');
const btnPrev = document.querySelector('.js-btn-prev');
const btnNext = document.querySelector('.js-btn-next');
const btnPages = document.querySelector('.pages');
const myKey = '2f2663043f4e6e1c1ca2fc9d3ec31eb9';
const urlSearch = "https://api.themoviedb.org/3/search/collection?";
const urlPopular = "https://api.themoviedb.org/3/movie/popular?";
let value;
let page = 1;
let options;
let totalPages = 0;
let loadPage = true;

function getFilmsList(e) {
    value = inputSearch.value;
    if (e === 'next') {page += 1} else if (e === 'prev') { if (page <= 1) {return;}  else {page -= 1}} else {page = 1}
    btnNumber.textContent = page;

    if (loadPage) {options = `${urlPopular}api_key=${myKey}&language=en-US&page=${page}`;} else {options = `${urlSearch}api_key=${myKey}&language=ru-RU,en-US&query=${value}&page=${page}`;}
    fetch(options)
      .then((response) => response.json())
      .then((data) => {postList(data); showPages(data.total_pages, page)})
      .catch((error) => console.log(error));
  }

  function showPages(totalPages, page) {
    if (totalPages === 1) {btnPrev.disabled = true; btnNext.disabled = true; return;}
    if (totalPages >= 2) {btnNext.disabled = false;}
    if (page === 1) {btnPrev.disabled = true;} else {btnPrev.disabled = false;}
    if (totalPages === page) {btnNext.disabled = true;}
  }

  getFilmsList();
document.addEventListener('keydown', event => {
    // console.log(event.code)
    if (event.code === "Enter") {
        getFilmsList();
        loadPage = false;
    }
});
btnPrev.addEventListener('click', event => {
    getFilmsList('prev')
});
btnNext.addEventListener('click', event => {
    getFilmsList('next')
});

// function getFilmsList(e) {
//     value = inputSearch.value;
//     if (e === 'next') {page += 1} else if (e === 'prev') { if (page <= 1) {return;}  else {page -= 1}} else {page = 1}
//     btnNumber.textContent = page;

//     options = `api_key=${myKey}&language=ru-RU&query=${value}&page=${page}`;
//     fetch(getUrl + options)
//       .then((response) => response.json())
//       .then((data) => postList(data))
//       .catch((error) => console.log(error));
//   }