const libraryList = document.querySelector('.library__list');
const addToWatched = document.querySelector('.film__btn--favorite');
const addToQueue = document.querySelector('.film__btn--queue');

addToWatched.addEventListener('click', addFavoriteMovieToLocalStorage);

// addToQueue.addEventListener('click', addWatchedMovieToLocalStorage);
//при виклику кюе треба замінити лакал сторадж на  = filmsQueue

function addFavoriteMovieToLocalStorage() {
  let filmObject = JSON.parse(localStorage.getItem('dataFilm'));
  let newFilmObject = {
    backdrop_path: filmObject.backdrop_path,
    original_title: filmObject.original_title,
    id: filmObject.id,
    vote_average: filmObject.vote_average,
  };

  if (localStorage.getItem('filmsWatched')) {
    let obj = JSON.parse(localStorage.getItem('filmsWatched'));

    localStorage.setItem(
      'filmsWatched',
      JSON.stringify([...obj, newFilmObject]),
    );
  } else {
    localStorage.setItem('filmsWatched', JSON.stringify([newFilmObject]));
  }
}
function drawWatchedFilmList() {
  let movieMasyv = JSON.parse(localStorage.getItem('filmsWatched'));
  movieMasyv = movieMasyv.map(obj => createLibraryCardFunc(obj)).join('');
  libraryList.innerHTML = movieMasyv;
}

function createLibraryCardFunc(obj) {
  let li = `<li class="list-items" data-id="${obj.id}">
        <img src="https://image.tmdb.org/t/p/w500/${obj.backdrop_path}" alt="${obj.original_title}" class="list-items__img">
        <div class="layout">
            <p class="list-items__title">${obj.original_title}</p>
        </div>   
        </li>`;
  return li;
}

// function removeFavoriteMovieFromLocalStorage() {}

// function addWatchedMovieToLocalStorage() {
//   let filmObject = JSON.parse(localStorage.getItem('dataFilm'));
//   let newFilmObject = {
//     backdrop_path: filmObject.backdrop_path,
//     original_title: filmObject.original_title,
//     id: filmObject.id,
//     vote_average: filmObject.vote_average,
//   };

//   if (localStorage.getItem('filmsQueue')) {
//     let obj = JSON.parse(localStorage.getItem('filmsQueue'));

//     localStorage.setItem('filmsQueue', JSON.stringify([...obj, newFilmObject]));
//   } else {
//     localStorage.setItem('filmsQueue', JSON.stringify([newFilmObject]));
//   }
// }
// function drawWatchedFilmList() {
//   let movieMasyv = JSON.parse(localStorage.getItem('filmsQueue'));
//   movieMasyv = movieMasyv.map(obj => createLibraryCardFunc(obj)).join('');
//   libraryList.innerHTML = movieMasyv;
// }

// function createLibraryCardFunc(obj) {
//   let li = `<li class="list-items" data-id="${obj.id}">
//         <img src="https://image.tmdb.org/t/p/w500/${obj.backdrop_path}" alt="${obj.original_title}" class="list-items__img">
//         <div class="layout">
//             <p class="list-items__title">${obj.original_title}</p>
//         </div>
//         </li>`;
//   return li;
// }
