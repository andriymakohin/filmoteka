const libraryList = document.querySelector('.library__list');
const addToWatched = document.querySelector('.film__btn--favorite');
const addToQueue = document.querySelector('.film__btn--queue');
// const list = document.querySelector('.js-list');
// console.log(list);

addToWatched.addEventListener('click', addFavoriteMovieToLocalStorage);
// addToQueue.addEventListener('click', createLibraryCardFunc);

function addFavoriteMovieToLocalStorage() {
  if (localStorage.getItem('watchedMovie')) {
    let obj = JSON.stringify([
      JSON.parse(localStorage.getItem('watchedMovie')),
      {
        rgre: 'wwwwwww',
      },
    ]);

    localStorage.setItem('watchedMovie', obj);
  } else {
    localStorage.setItem('watchedMovie', JSON.stringify({ regre: 'regerg' }));
  }
}

function removeFavoriteMovieFromLocalStorage() {}

// function createLibraryCardFunc(imgPath, filmTitle, movieId, voteAverage) {
//   const libraryItem = document.createElement('li');
//   const libraryImg = document.createElement('img');
//   const libraryTitle = document.createElement('h3');
//   const libraryDesc = document.createElement('p');
//   libraryImg.setAttribute('src', imgPath);
//   libraryTitle.textContent = filmTitle;
//   libraryDesc.textContent = voteAverage;
//   libraryItem.setAttribute('id', movieId);
//   libraryItem.append(libraryImg, libraryTitle, libraryDesc);
//   // console.log(libraryItem);
//   // libraryList.insertAdjacentHTML('beforeend', libraryItem);
//   return libraryItem;
// }

// createLibraryCardFunc();
