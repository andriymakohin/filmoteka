const pageUlr = 'https://image.tmdb.org/t/p/w500';
const listFilms = document.querySelector('.js-list');
const notFound = 'https://blog.vverh.digital/wp-content/uploads/2020/06/oblojka-404.png';
let src;
let title;
function postList(array) {
    console.log(array)
    let liArray = array.results.map(item => createList(item)).join('');
    listImages.innerHTML = liArray;
}
function createList(array) {
    if (array.poster_path !== null) {
        src = pageUlr+array.poster_path;
    } else {
        src = notFound;
    }
    
    let markup = `<li class="list-items" data-id="${array.id}">
        <img src="${src}" alt="" class="list-items__img">
        <div class="layout">
            <p class="list-items__title">${array.name}</p>
        </div>   
        </li>`

    return markup;
}