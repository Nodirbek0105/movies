const key = "f56bbb3a";
const apiKey = `https://www.omdbapi.com/?apikey=${key}`;
const apiKeyImg = `https://img.omdbapi.com/?apikey=${key}`;
//movie-inner
let elMovieBox = document.querySelector("[data-box-movie]");
//movie-form
// let elForm = document.querySelector("[data-form]");
let elInputSearch = document.querySelector("[data-form-search]");
let elTitle = document.querySelector("[data-form-title]");
let elLang = document.querySelector("[data-form-lang]");
let elDescription = document.querySelector("[data-form-description]");
let elImgUrl = document.querySelector("[data-form-img-url]");
let elBtn = document.querySelector("[data-add-btn]");
let elTemplate = document.querySelector("[data-movie-template]");
let elTemplateAbout = document.querySelector("[data-template]");

loadingFirst();
async function loadingFirst() {
  // pagination.style.display = "none"
  elMovieBox.innerHTML = `<div class="inner" style="width: 200px; height: 200px;"><svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" style="margin: auto; background: rgb(22, 29, 37); display: block;" width="200px" height="200px" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid">
  <g transform="rotate(0 50 50)">
    <rect x="47" y="24" rx="3" ry="6" width="6" height="12" fill="#aaaaaa">
      <animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s" begin="-0.9166666666666666s" repeatCount="indefinite"></animate>
    </rect>
  </g><g transform="rotate(30 50 50)">
    <rect x="47" y="24" rx="3" ry="6" width="6" height="12" fill="#aaaaaa">
      <animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s" begin="-0.8333333333333334s" repeatCount="indefinite"></animate>
    </rect>
  </g><g transform="rotate(60 50 50)">
    <rect x="47" y="24" rx="3" ry="6" width="6" height="12" fill="#aaaaaa">
      <animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s" begin="-0.75s" repeatCount="indefinite"></animate>
    </rect>
  </g><g transform="rotate(90 50 50)">
    <rect x="47" y="24" rx="3" ry="6" width="6" height="12" fill="#aaaaaa">
      <animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s" begin="-0.6666666666666666s" repeatCount="indefinite"></animate>
    </rect>
  </g><g transform="rotate(120 50 50)">
    <rect x="47" y="24" rx="3" ry="6" width="6" height="12" fill="#aaaaaa">
      <animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s" begin="-0.5833333333333334s" repeatCount="indefinite"></animate>
    </rect>
  </g><g transform="rotate(150 50 50)">
    <rect x="47" y="24" rx="3" ry="6" width="6" height="12" fill="#aaaaaa">
      <animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s" begin="-0.5s" repeatCount="indefinite"></animate>
    </rect>
  </g><g transform="rotate(180 50 50)">
    <rect x="47" y="24" rx="3" ry="6" width="6" height="12" fill="#aaaaaa">
      <animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s" begin="-0.4166666666666667s" repeatCount="indefinite"></animate>
    </rect>
  </g><g transform="rotate(210 50 50)">
    <rect x="47" y="24" rx="3" ry="6" width="6" height="12" fill="#aaaaaa">
      <animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s" begin="-0.3333333333333333s" repeatCount="indefinite"></animate>
    </rect>
  </g><g transform="rotate(240 50 50)">
    <rect x="47" y="24" rx="3" ry="6" width="6" height="12" fill="#aaaaaa">
      <animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s" begin="-0.25s" repeatCount="indefinite"></animate>
    </rect>
  </g><g transform="rotate(270 50 50)">
    <rect x="47" y="24" rx="3" ry="6" width="6" height="12" fill="#aaaaaa">
      <animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s" begin="-0.16666666666666666s" repeatCount="indefinite"></animate>
    </rect>
  </g><g transform="rotate(300 50 50)">
    <rect x="47" y="24" rx="3" ry="6" width="6" height="12" fill="#aaaaaa">
      <animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s" begin="-0.08333333333333333s" repeatCount="indefinite"></animate>
    </rect>
  </g><g transform="rotate(330 50 50)">
    <rect x="47" y="24" rx="3" ry="6" width="6" height="12" fill="#aaaaaa">
      <animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s" begin="0s" repeatCount="indefinite"></animate>
    </rect>
  </g>
  </svg></div>`;
  await searchMovie("hulk");
  // pagination.style.display = "flex"
}

const elForm = document.querySelector("[data-input-search]");
elForm.addEventListener("submit", (evt) => {
  evt.preventDefault();
  const form = new FormData(elForm);
  const name = form.get("search");
  searchMovie(name);
});

document.body.addEventListener("click", (evt) => {
  modalCloseModal(evt);
  modalOpenModal(evt);
});

async function searchMovie(value, page = 1) {
  try {
    let response = await fetch(`${apiKey}&s=${value}&page=${page}`);
    let result = await response.json();
    renderMovie(result);
    total = Math.ceil(+result.totalResults / 10)
    // index = value
  slide( index , value, page);
  // slide(Math.ceil(+result.totalResults / 10), value, page);
  } catch (error) {
    renderE(error);
  }
}

function clickPage(evt) {
  let el = evt.target.closest("[data-page]");
  if (!el) return;
  evt.preventDefault();
  searchMovie(el.dataset.value, el.dataset.page);
}

function renderMovie(arrayFirst) {
  let array = arrayFirst.Search;
  elMovieBox.innerHTML = "";
  array.forEach((movie) => {
    elMovieBox.appendChild(createLi(movie));
  });
}

function createLi(movie) {
  const card = elTemplate.content.cloneNode(true);
  card.querySelector(".movie-item__img").src =
    movie.Poster === "N/A"
      ? "https://via.placeholder.com/220x340"
      : movie.Poster;
  card.querySelector(".movie-item__img").alt = movie.Title;
  card.querySelector(".movie-card__title").textContent = movie.Title;
  card.querySelector("[data-movie-id]").dataset.id = movie.imdbID;
  return card;
}

function modalOpen(el) {
  el.classList.toggle("d-none");
  el.classList.toggle("d-flex");
}

function modalCloseModal(e) {
  let elM = e.target.closest("[data-modal]");
  let elMC = e.target.closest("[data-modal-content]");
  let elMClose = e.target.closest("[data-close-modal]");
  if (!elM) return;
  if (!elMClose) {
    if (elMC) return;
  }
  modalOpen(elM);
}

function modalOpenModal(e) {
  let elM = e.target.closest("[data-id]");
  if (!elM) return;
  let id = elM.dataset.id;
  let modal = document.querySelector("[data-modal]");
  modalOpen(modal);
  aboutMovie(id);
}
let aboutUl = document.querySelector("[data-ul2]");

async function aboutMovie(num) {
  try {
    aboutUl.innerHTML = `<div class="loading"><span></span><span></span><span></span></div>`;
    let response = await fetch(`${apiKey}&i=${num}`);
    let result = await response.json();
    // renderMovie(result)

    aboutUl.innerHTML = "";
    aboutUl.append(createDiv(result));
  } catch (error) {
    renderE(error);
  }
}

function createDiv(movie) {
  aboutUl.innerHTML = "";
  const card = elTemplateAbout.content.cloneNode(true);
  card.querySelector("[data-img-movie]").src =
    movie.Poster === "N/A"
      ? "https://via.placeholder.com/220x340"
      : movie.Poster;
  card.querySelector("[data-img-movie]").alt = movie.Title;
  card.querySelector("[data-title-movie]").textContent = movie.Title;
  card.querySelector("[data-overage]").textContent = `⭐${movie.imdbRating}⭐`;
  card.querySelector("[data-overview]").textContent = movie.Plot;
  card.querySelector("[data-date]").textContent = movie.Released;
  card.querySelector("[data-count]").textContent = movie.Language;
  card.querySelector(".diagram").style.backgroundImage = `linear-gradient(
    to right,
    yellow 0%,
    yellow ${movie.imdbRating * 10}%,
    white ${movie.imdbRating * 10}%,
    white 100%
)`;
  card.querySelector(".diagram").textContent = movie.imdbRating;
  card.querySelector(".diagram").style.paddingLeft = `${
    movie.imdbRating * 10 - 3
  }%`;
  card.querySelector("[data-runtime]").textContent = movie.Runtime;
  card.querySelector("[data-visibility]").textContent = movie.imdbVotes;

  return card;
}

function renderE(err) {
  console.log(err);
}


// listPagination.addEventListener("click", (e) => {
//   e.preventDefault();
//   clickPage(e);
// });

async function renderPagination(pages, query, page) {
  let html = "";
  html += `<li class="page-item${
    +page === 1 ? " disabled" : ""
  }"><a class="page-link" data-page=${
    +page - 1
  } data-value=${query} href="?page=${+page - 1}">Previous</a></li>`;
  for (let i = 1; i <= pages; i++) {
    html += `<li class="page-item${
      +page === +i ? " active" : ""
    }"><a class="page-link" data-page=${i} data-value=${query} href="?page=${i}">${i}</a></li>`;
  }
  html += `<li class="page-item${
    +page === +pages ? " disabled" : ""
  }"><a class="page-link" data-page=${
    +page + 1
  } data-value=${query}  href="?page=${+page + 1}">Next</a></li>`;
  // listPagination.innerHTML = html;
  // listPagination.style.maxWidth = (window.innerWidth / 100) * 80;
}
