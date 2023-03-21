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

elMovieBox.innerHTML = `<div class="loader">
<span class="first"></span>
<span class="second"></span>
<span class="third"></span>
</div>`;

searchMovie("movie");

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

async function searchMovie(value) {
  try {
    let response = await fetch(`${apiKey}&s=${value}`);
    let result = await response.json();
    renderMovie(result);
  } catch (error) {
    renderE(error);
  }
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
  card.querySelector(".movie-item__img").src = movie.Poster;
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
  let elMC = e.target.closest("[data-modal-content]")
  let elMClose = e.target.closest("[data-close-modal]")
  if (!elM) return;
  if (!elMClose){
    if (elMC) return;
  };
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
    aboutUl.innerHTML = `<div class="loader">
    <span class="first"></span>
    <span class="second"></span>
    <span class="third"></span>
    </div>`;
    let response = await fetch(`${apiKey}&i=${num}`);
    let result = await response.json();
    // renderMovie(result)

    aboutUl.innerHTML = "";
    // let movie =    // movies.find((a) => a.id == +num);
    aboutUl.append(createDiv(result));
  } catch (error) {
    renderE(error);
  }
}

function createDiv(movie) {
  aboutUl.innerHTML = "";
  const card = elTemplateAbout.content.cloneNode(true);
  card.querySelector("[data-img-movie]").src = movie.Poster;
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
