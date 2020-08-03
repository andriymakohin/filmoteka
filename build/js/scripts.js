"use strict";

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Details = /*#__PURE__*/function () {
  function Details() {
    _classCallCheck(this, Details);

    this.textDetails = document.querySelector('#js-textDetails');
    this.img = document.querySelector('#js-detailsImg');
    this.title = document.querySelector('#js-detailsTitle');
    this.vote = document.querySelector('#js-vote');
    this.voteCount = document.querySelector('#js-voteCount');
    this.popularity = document.querySelector('#js-popularity');
    this.originalTitle = document.querySelector('#js-originalTitle');
    this.genre = document.querySelector('#js-genre');
    this.releaseDate = document.querySelector('#js-releaseDate');
    this.runTime = document.querySelector('#js-runTime');
    this.addQueueButton = document.querySelector('#js-addQueueButton');
    this.addWatchedButton = document.querySelector('#js-addWatchedButton');
    this.addWatchedImg = document.querySelector('.film__btnVideo--img');
    this.addQueueImg = document.querySelector('.film__btnCalendar--img');
    this.filmsQueueArr = [];
    this.filmsWatchedArr = [];
    this.setNameLocalStrage = ['Queue', 'Watched', 'dataFilm'];
  }

  _createClass(Details, [{
    key: "toggleToQueue",
    value: function toggleToQueue() {
      var _this = this;

      this.filmObject = JSON.parse(localStorage.getItem(this.setNameLocalStrage[2]));
      this.getfilmSave = JSON.parse(localStorage.getItem('films' + this.setNameLocalStrage[0]));

      if (this.getfilmSave && this.getfilmSave.find(function (item) {
        return item.id === _this.filmObject.id;
      })) {
        this.deleteIndex = this.getfilmSave.indexOf(this.getfilmSave.find(function (item) {
          return item.id === _this.filmObject.id;
        }));
        this.getfilmSave.splice(this.deleteIndex, 1);
        localStorage.setItem('films' + this.setNameLocalStrage[0], JSON.stringify(this.getfilmSave));
        detailsPage.monitorButtonStatusText(this.filmObject);
        return;
      }

      this.newFilmObject = {
        backdrop_path: this.checkPoster(this.filmObject.backdrop_path, this.filmObject.poster_path),
        original_title: this.filmObject.original_title,
        id: this.filmObject.id,
        vote_average: this.filmObject.vote_average
      };

      if (this.getfilmSave) {
        this.obj = JSON.parse(localStorage.getItem('films' + this.setNameLocalStrage[0]));
        localStorage.setItem('films' + this.setNameLocalStrage[0], JSON.stringify([this.newFilmObject].concat(_toConsumableArray(this.obj))));
      } else {
        localStorage.setItem('films' + this.setNameLocalStrage[0], JSON.stringify([this.newFilmObject]));
      }

      detailsPage.monitorButtonStatusText(this.filmObject);
    }
  }, {
    key: "toggleToWatched",
    value: function toggleToWatched() {
      var _this2 = this;

      this.filmObject = JSON.parse(localStorage.getItem(this.setNameLocalStrage[2]));
      this.getfilmSave = JSON.parse(localStorage.getItem('films' + this.setNameLocalStrage[1]));

      if (this.getfilmSave && this.getfilmSave.find(function (item) {
        return item.id === _this2.filmObject.id;
      })) {
        this.deleteIndex = this.getfilmSave.indexOf(this.getfilmSave.find(function (item) {
          return item.id === _this2.filmObject.id;
        }));
        this.getfilmSave.splice(this.deleteIndex, 1);
        localStorage.setItem('films' + this.setNameLocalStrage[1], JSON.stringify(this.getfilmSave));
        detailsPage.monitorButtonStatusText(this.filmObject);
        return;
      }

      this.newFilmObject = {
        backdrop_path: this.checkPoster(this.filmObject.backdrop_path, this.filmObject.poster_path),
        original_title: this.filmObject.original_title,
        id: this.filmObject.id,
        vote_average: this.filmObject.vote_average
      };

      if (this.getfilmSave) {
        this.obj = JSON.parse(localStorage.getItem('films' + this.setNameLocalStrage[1]));
        localStorage.setItem('films' + this.setNameLocalStrage[1], JSON.stringify([this.newFilmObject].concat(_toConsumableArray(this.obj))));
      } else {
        localStorage.setItem('films' + this.setNameLocalStrage[1], JSON.stringify([this.newFilmObject]));
      }

      detailsPage.monitorButtonStatusText(this.filmObject);
    }
  }, {
    key: "checkPoster",
    value: function checkPoster(poster_first, poster_second) {
      return poster_first ? poster_first : poster_second;
    }
  }, {
    key: "showDetails",
    value: function showDetails(selectFilm) {
      this.img.src = "https://image.tmdb.org/t/p/w500".concat(selectFilm.poster_path);
      this.title.textContent = selectFilm.data;
      this.vote.textContent = selectFilm.vote_average;
      this.voteCount.textContent = selectFilm.vote_count;
      this.popularity.textContent = selectFilm.popularity;
      this.originalTitle.textContent = selectFilm.original_title;
      this.genre.innerHTML = selectFilm.genres.map(function (item) {
        return "<p>".concat(item.name, "</p>");
      }).join('');
      this.releaseDate.textContent = selectFilm.release_date;
      this.runTime.textContent = selectFilm.runtime;
      this.textDetails.textContent = selectFilm.overview;
      this.monitorButtonStatusText(selectFilm);
    }
  }, {
    key: "monitorButtonStatusText",
    value: function monitorButtonStatusText(selectFilm) {
      this.localStorageFilmsQueue = localStorage.getItem('films' + this.setNameLocalStrage[0]);

      if (this.localStorageFilmsQueue && JSON.parse(this.localStorageFilmsQueue).find(function (el) {
        return el.id === selectFilm.id;
      })) {
        this.addQueueImg.setAttribute('src', './images/details-page-icon/calendar-minus.png');
        this.addQueueButton.lastChild.textContent = 'Delete from queue';
      } else {
        this.addQueueImg.setAttribute('src', './images/details-page-icon/calendar.jpg');
        this.addQueueButton.lastChild.textContent = 'Add to queue';
      }

      this.localStorageFilmsWatched = localStorage.getItem('films' + this.setNameLocalStrage[1]);

      if (this.localStorageFilmsWatched && JSON.parse(this.localStorageFilmsWatched).find(function (el) {
        return el.id === selectFilm.id;
      })) {
        this.addWatchedImg.setAttribute('src', './images/details-page-icon/delete-video.png');
        this.addWatchedButton.lastChild.textContent = 'Delete from watched';
      } else {
        this.addWatchedImg.setAttribute('src', './images/details-page-icon/video.jpg');
        this.addWatchedButton.lastChild.textContent = 'Add to watched';
      }
    }
  }, {
    key: "getDetails",
    value: function getDetails(id) {
      var _this3 = this;

      this.options = "https://api.themoviedb.org/3/movie/".concat(id, "?api_key=").concat(homePage.API_KEY, "&language=").concat(homePage.searchLang, "&append_to_response=image");
      fetch(this.options).then(function (response) {
        return response.json();
      }).then(function (data) {
        _this3.showDetails(data);

        localStorage.setItem('dataFilm', JSON.stringify(data));
      }).catch(function (error) {
        return console.log(error);
      });
    }
  }, {
    key: "init",
    value: function init() {
      var _this4 = this;

      document.addEventListener('click', function (event) {
        if (event.target.parentNode.getAttribute('class') === 'list__items') {
          _this4.getDetails(event.target.parentNode.getAttribute('data-id'));
        }
      });
    }
  }]);

  return Details;
}();

var detailsPage = new Details();
detailsPage.init();
"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var LibraryPage = /*#__PURE__*/function () {
  function LibraryPage() {
    _classCallCheck(this, LibraryPage);

    this.libraryList = document.querySelector('[data-page="library"]');
    this.pageUlr = 'https://image.tmdb.org/t/p/w500/';
  }

  _createClass(LibraryPage, [{
    key: "drawFilmList",
    value: function drawFilmList(params) {
      this.movieMasyv = JSON.parse(localStorage.getItem('films' + params));
      document.querySelector('.library__item--active') ? document.querySelector('.library__item--active').classList.remove('library__item--active') : null;

      if (params === 'Watched') {
        navigationPage.favoriteBtn.classList.add('library__item--active');
      } else {
        navigationPage.queueBtn.classList.add('library__item--active');
      }

      this.libraryList.innerHTML = 'You do not have to ' + params + ' movies to watch. Add them.';

      if (!this.movieMasyv || this.movieMasyv.length === 0) {
        return;
      }

      this.movieMasyv = this.movieMasyv.map(function (obj) {
        return loadPage.createList(obj);
      }).join('');
      this.libraryList.innerHTML = this.movieMasyv;
    }
  }]);

  return LibraryPage;
}();

var filmLibraryPage = new LibraryPage();
"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var LoadList = /*#__PURE__*/function () {
  function LoadList() {
    _classCallCheck(this, LoadList);

    this.pageUlr = 'https://image.tmdb.org/t/p/w500';
    this.listImages = document.querySelector('.js-list');
    this.src = '../images/404.png';
    this.title = "";
  }

  _createClass(LoadList, [{
    key: "progressBar",
    value: function progressBar() {
      this.winScroll = document.body.scrollTop || document.documentElement.scrollTop;
      this.height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      this.scrolled = this.winScroll / this.height * 100;
      document.getElementById("myBar").style.width = this.scrolled + "%";
    }
  }, {
    key: "postList",
    value: function postList(array) {
      var _this = this;

      this.liArray = array.results.map(function (item) {
        return _this.createList(item);
      }).join('');
      this.listImages.innerHTML = this.liArray;
    }
  }, {
    key: "createList",
    value: function createList(array) {
      array.backdrop_path ? this.src = this.pageUlr + array.backdrop_path : null;
      array.poster_path ? this.src = this.pageUlr + array.poster_path : null;
      array.original_title ? this.title = array.original_title : this.title = array.original_name;
      return "<li class=\"list__items\" data-id=\"".concat(array.id, "\">\n            <img src=\"").concat(this.src, "\" alt=\"").concat(this.title, "\" class=\"list__itemsImg\">\n            <div class=\"list__layout\">\n                <p class=\"list__itemsTitle\">").concat(this.title, "</p>\n            </div>   \n            </li>");
    }
  }]);

  return LoadList;
}();

var loadPage = new LoadList();

window.onscroll = function () {
  loadPage.progressBar();
};

jQuery(function (f) {
  var element = f('.footer__btnSection');
  f(window).scroll(function () {
    element['fade' + (f(this).scrollTop() > 0 ? 'In' : 'Out')](500);
  });
});
"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Navigation = /*#__PURE__*/function () {
  function Navigation() {
    _classCallCheck(this, Navigation);

    this.home_library = Array.from(document.querySelectorAll('.header__navItem'));
    this.addToWatched = document.querySelector('.film__btn--favorite');
    this.addToQueue = document.querySelector('.film__btn--queue');
    this.detailsPageNone = document.querySelector('.film');
    this.filmLibraryPageNone = document.querySelector('.library');
    this.favoriteBtn = Array.from(document.querySelectorAll('.library__item'))[0];
    this.queueBtn = Array.from(document.querySelectorAll('.library__item'))[1];
    this.logo = document.querySelector('.header__logo');
    this.formWrap = document.querySelector('.form-wrap');
    this.movieWrap = document.querySelector('.movies-wrap');
    this.list = document.querySelector('[data-page="home"]');
    this.listLib = document.querySelector('[data-page="library"]');
    this.selectFilm = '';
  }

  _createClass(Navigation, [{
    key: "activeHomePage",
    value: function activeHomePage() {
      this.movieWrap.classList.remove('display-section');
      this.detailsPageNone.classList.add('display-section');
      this.filmLibraryPageNone.classList.add('display-section');
      this.formWrap.classList.remove('display-section');
    }
  }, {
    key: "activeLibraryPage",
    value: function activeLibraryPage() {
      this.detailsPageNone.classList.add('display-section');
      this.detailsPageNone.classList.add('display-section');
      this.movieWrap.classList.add('display-section');
      this.filmLibraryPageNone.classList.remove('display-section');
    }
  }, {
    key: "activeDetailsPage",
    value: function activeDetailsPage() {
      this.movieWrap.classList.add('display-section');
      this.filmLibraryPageNone.classList.add('display-section');
      this.detailsPageNone.classList.remove('display-section');
    }
  }, {
    key: "init",
    value: function init() {
      var _this = this;

      this.activeHomePage();
      this.addToQueue.addEventListener('click', function () {
        return detailsPage.toggleToQueue();
      });
      this.addToWatched.addEventListener('click', function () {
        return detailsPage.toggleToWatched();
      });
      this.list.addEventListener('click', function () {
        return _this.activeDetailsPage();
      });
      this.listLib.addEventListener('click', function () {
        return _this.activeDetailsPage();
      });
      this.home_library[0].addEventListener('click', function () {
        return _this.activeHomePage();
      });
      this.home_library[1].addEventListener('click', function () {
        _this.activeLibraryPage();

        filmLibraryPage.drawFilmList('Watched');
      });
      this.logo.addEventListener('click', function () {
        return _this.activeHomePage();
      });
      this.favoriteBtn.addEventListener('click', function () {
        return filmLibraryPage.drawFilmList('Watched');
      });
      this.queueBtn.addEventListener('click', function () {
        return filmLibraryPage.drawFilmList('Queue');
      });
    }
  }]);

  return Navigation;
}();

var navigationPage = new Navigation();
navigationPage.init();
"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Search = /*#__PURE__*/function () {
  function Search(apiKey) {
    _classCallCheck(this, Search);

    this.inputSearch = document.querySelector('.search__film');
    this.searchBtn = document.querySelector('.search__btn');
    this.btnNumber = document.querySelector('.page-number');
    this.btnPrev = document.querySelector('.js-btn-prev');
    this.btnNext = document.querySelector('.js-btn-next');
    this.listMovie = document.querySelector('.listMovie');
    this.API_KEY = apiKey;
    this.searchLang = 'uk-UA';
    this.urlApi = 'https://api.themoviedb.org/3/';
    this.value = '';
    this.page = 1;
    this.options = '';
    this.setloadPage = true;
    this.typeUrl = 'movie/multi';
  }

  _createClass(Search, [{
    key: "getFilmsList",
    value: function getFilmsList(event) {
      var _this = this;

      event ? this.page = 1 : null;

      if (!this.setloadPage) {
        if (this.check(this.inputSearch.value)) {
          this.value = this.inputSearch.value;
        } else {
          return;
        }

        this.options = "$&query=".concat(this.value);
      }

      fetch(this.getUrl(event) + this.options).then(function (response) {
        return response.json();
      }).then(function (data) {
        loadPage.postList(data);

        _this.plaginationPages(data.total_pages, _this.page);

        _this.btnNumber.textContent = "".concat(_this.page, " \u0437 ").concat(data.total_pages);
      }).catch(function (error) {
        return console.log(error);
      });
    }
  }, {
    key: "check",
    value: function check(item) {
      if (item === "" || item === " " || item === "  " || item === "   ") {
        return false;
      }

      return true;
    }
  }, {
    key: "setPrevNext",
    value: function setPrevNext(params) {
      if (params === 'prev') {
        if (this.page <= 1) {
          return;
        }

        this.page -= 1;
      }

      params === 'next' ? this.page += 1 : null;
      this.getFilmsList();
    }
  }, {
    key: "getUrl",
    value: function getUrl(params) {
      if (params === 'search') {
        this.typeUrl = 'search/movie';
        this.listMovie.style.display = "none";
      }

      params === 'playing' ? this.typeUrl = 'movie/now_playing' : null;
      params === 'popular' ? this.typeUrl = 'movie/popular' : null;
      params === 'top' ? this.typeUrl = 'movie/top_rated' : null;
      params === 'upcoming' ? this.typeUrl = 'movie/upcoming' : null;

      if (params === 'playing' || params === 'popular' || params === 'top' || params === 'upcoming') {
        localStorage.setItem('loadPage', params);
        this.listMovie.style.display = "flex";
        this.listMovieActive(params);
      }

      ;
      return "".concat(this.urlApi).concat(this.typeUrl, "?api_key=").concat(this.API_KEY, "&language=").concat(this.searchLang, "&page=").concat(this.page, "&include_adult=false");
    }
  }, {
    key: "listMovieActive",
    value: function listMovieActive(params) {
      document.querySelector('.listMovie__item--active') ? document.querySelector('.listMovie__item--active').classList.remove('listMovie__item--active') : null;
      document.querySelector('.listMovie__item[data-type="' + params + '"]').classList.add('listMovie__item--active');
    }
  }, {
    key: "plaginationPages",
    value: function plaginationPages(totalPages) {
      this.btnNumber.disabled = true;

      if (totalPages === 1) {
        this.btnPrev.disabled = true;
        this.btnNext.disabled = true;
        return;
      }

      totalPages >= 2 ? this.btnNext.disabled = false : null;
      this.page === 1 ? this.btnPrev.disabled = true : this.btnPrev.disabled = false;
      totalPages === this.page ? this.btnNext.disabled = true : null;
    }
  }, {
    key: "closePage",
    value: function closePage() {
      document.getElementById("myDiv").style.display = "none";
      document.getElementById("loader").style.display = "block";
      setTimeout(this.showPage, 1000);
    }
  }, {
    key: "showPage",
    value: function showPage() {
      document.getElementById("myDiv").style.display = "block";
      document.getElementById("loader").style.display = "none";
    }
  }, {
    key: "init",
    value: function init() {
      var _this2 = this;

      this.getFilmsList(localStorage.getItem('loadPage') ? localStorage.getItem('loadPage') : 'popular');
      this.searchBtn.addEventListener('click', function (event) {
        event.preventDefault();
        _this2.setloadPage = false;

        _this2.closePage();

        _this2.getFilmsList('search');
      });
      document.addEventListener('keydown', function (event) {
        if (event.keyCode === 13) {
          _this2.setloadPage = false;
          event.preventDefault();

          _this2.closePage();

          _this2.getFilmsList('search');
        }
      });
      this.btnPrev.addEventListener('click', function () {
        return _this2.setPrevNext('prev');
      });
      this.btnNext.addEventListener('click', function () {
        return _this2.setPrevNext('next');
      });
      document.addEventListener('click', function (event) {
        if (event.target.getAttribute('data-type')) {
          _this2.getFilmsList(event.target.getAttribute('data-type'));
        }
      });
    }
  }]);

  return Search;
}();

var homePage = new Search('2f2663043f4e6e1c1ca2fc9d3ec31eb9');
homePage.init();