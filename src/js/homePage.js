const pageUlr = 'https://image.tmdb.org/t/p/w500';
const listImages = document.querySelector('.js-list');
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
        src = pageUlr+array.backdrop_path;
    } else if (array.poster_path) {
        src = array.poster_path;
    } else { src = notFound;}
    if (array.original_title) {
        title = array.original_title
    } else {
        title = array.original_name
    };
    
    let li = `<li class="list-items">
        <img src="${src}" alt="" class="list-items__img">
        <div class="layout">
            <p class="list-items__title">${title}</p>
        </div>   
        </li>`
    return li;
}