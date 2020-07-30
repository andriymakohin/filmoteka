
class loadList {
    constructor() {
        this.pageUlr = 'https://image.tmdb.org/t/p/w500';
        this.listImages = document.querySelector('.js-list');
        this.notFound = '../images/404.png';
        this.src = this.notFound;
        this.title = "";
    }
    postList(array) {
        this.liArray = array.results.map(item => this.createList(item)).join('');
        this.listImages.innerHTML = this.liArray;
    }
    createList(array) {
        array.backdrop_path? this.src = this.pageUlr+array.backdrop_path : null;
        array.poster_path? this.src = this.pageUlr+array.poster_path : null;
        array.original_title? this.title = array.original_title : this.title = array.original_name;
        
        return `<li class="list-items" data-id="${array.id}">
            <img src="${this.src}" alt="${this.title}" class="list-items__img">
            <div class="layout">
                <p class="list-items__title">${this.title}</p>
            </div>   
            </li>`;
    }
}

const loadPage = new loadList();
