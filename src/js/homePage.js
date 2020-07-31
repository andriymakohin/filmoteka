
class loadList {
    constructor() {
        this.pageUlr = 'https://image.tmdb.org/t/p/w500';
        this.listImages = document.querySelector('.js-list');
        this.src = '../images/404.png';
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
        
        return `<li class="list__items" data-id="${array.id}">
            <img src="${this.src}" alt="${this.title}" class="list__itemsImg">
            <div class="list__layout">
                <p class="list__itemsTitle">${this.title}</p>
            </div>   
            </li>`;
    }
}

const loadPage = new loadList();
