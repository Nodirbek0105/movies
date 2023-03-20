//movie-inner
var elMovieBox = document.querySelector("[data-box-movie]");
//movie-form
var elForm = document.querySelector("[data-form]");
var elInputSearch = document.querySelector("[data-form-search]");
var elTitle = document.querySelector("[data-form-title]");
var elLang = document.querySelector("[data-form-lang]");
var elDescription = document.querySelector("[data-form-description]");
var elImgUrl = document.querySelector("[data-form-img-url]");
var elBtn = document.querySelector("[data-add-btn]");
var elTemplate = document.querySelector("[data-movie-template]");
var elTemplateAbout = document.querySelector("[data-template]");



renderMovie(movies);
elForm.addEventListener("submit", (evt) => {
  evt.preventDefault();
  let idsHave = [];
  movies.forEach((a) => {
    idsHave.push(a.id);
  });
  const movie = {
    title: null,
    id: null,
    language: null,
    description: null,
    poster_path: null,
  };
  movie.id = Math.trunc(Math.random() * 1000000);
  movie.title = elTitle.value;
  movie.language = elLang.value;
  movie.description = elDescription.value;
  movie.poster_path = elImgUrl.value;

  // elMovieBox.prepend(createLi(movie));
  movies.unshift(movie);
  renderMovie(movies);
});
document.body.addEventListener("click", (evt) => {
  modalCloseModal(evt);
  modalOpenModal(evt);
});

function renderMovie(array) {
  elMovieBox.innerHTML = "";
  array.forEach((movie) => {
    elMovieBox.appendChild(createLi(movie));
  });
}

function createLi(movie) {
  const card = elTemplate.content.cloneNode(true);
  card.querySelector(
    ".movie-item__img"
  ).src = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
  card.querySelector(".movie-item__img").alt = movie.title;
  card.querySelector(".movie-card__title").textContent = movie.title;
  card.querySelector("[data-movie-id]").dataset.id = +movie.id;
  return card;
}

function createDiv(movie) {
  const card = elTemplateAbout.content.cloneNode(true);
  card.querySelector(
    "[data-img-movie]"
  ).src = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
  card.querySelector("[data-img-movie]").alt = movie.title;
  card.querySelector("[data-title-movie]").textContent = movie.title;
  card.querySelector(
    "[data-overage]"
  ).textContent = `⭐${movie.vote_average}⭐`;
  card.querySelector("[data-overview]").textContent = movie.overview;
  card.querySelector("[data-date]").textContent = movie.release_date;
  card.querySelector("[data-count]").textContent = movie.vote_count;
  card.querySelector(".diagram").style.backgroundImage = colorDiagram(movie.vote_average)

  return card;
}

elInputSearch.addEventListener("input", (evt) => {
  searchMovie(movies);
});

function searchMovie(array) {
  const newNames = array.filter((one) =>
    one.title.toLowerCase().includes(elInputSearch.value.toLowerCase())
  );
  renderMovie(newNames);
}

function modalOpen(el) {
  el.classList.toggle("d-none");
  el.classList.toggle("d-flex");
}

function modalCloseModal(e) {
  let elM = e.target.closest("[data-modal]");
  if (!elM) return;
  modalOpen(elM);
}

function modalOpenModal(e) {
  let elM = e.target.closest("[data-movie-id]");
  if (!elM) return;
  console.log(elM);
  let id = elM.dataset.id;
  let modal = document.querySelector("[data-modal]");
  console.log(modal);
  modalOpen(modal);
  aboutMovie(id);
}

function aboutMovie(num) {
  let aboutUl = document.querySelector("[data-ul2]");
  let movie = movies.find((a) => a.id == +num);
  aboutUl.innerHTML = "";
  aboutUl.append(createDiv(movie));
}

function colorDiagram(reating) {
  return ` linear-gradient(
    to right , 
    yellow 0%,
    yellow ${reating *10}%,
    white ${reating *10}%,
    white 100%,
  )`;
}
