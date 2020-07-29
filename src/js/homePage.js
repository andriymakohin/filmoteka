const pageUlr = 'https://image.tmdb.org/t/p/w500';
const listImages = document.querySelector('.js-list');
const notFound = 'https://blog.vverh.digital/wp-content/uploads/2020/06/oblojka-404.png';
let src = "";
let title = "";
function postList(array) {
    let liArray = array.results.map(item => createList(item)).join('');
    listImages.innerHTML = liArray;
}
function createList(array) {
    array.backdrop_path? src = pageUlr+array.backdrop_path : null;
    array.poster_path? src = pageUlr+array.poster_path : null;
    array.original_title? title = array.original_title : title = array.original_name;
    
    let li = `<li class="list-items" data-id="${array.id}">
        <img src="${src}" alt="" class="list-items__img">
        <div class="layout">
            <p class="list-items__title">${title}</p>
        </div>   
        </li>`
    return li;
}