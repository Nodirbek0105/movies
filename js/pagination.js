// basic paging logic to demo the buttons
let pr = document.querySelector(".paginate.left");
let pl = document.querySelector(".paginate.right");

// pr.onclick = slide.bind(this, -1);
// pl.onclick = slide.bind(this, 1);

let index = 0;
  let total;

function slide(offset, name , page = 1) {
  index = Math.min(Math.max(index + offset, 0), total - 1);

  document.querySelector(".counter").innerHTML = page + " / " + total;

  pr.setAttribute("data-state", +page === 1 ? "disabled" : "");
  pr.setAttribute("data-page", +page - 1);
  pr.setAttribute("data-name", name);
  pl.setAttribute("data-state", +page === total ? "disabled" : "");
  pl.setAttribute("data-page", +page + 1);
  pl.setAttribute("data-name", name);
}




function clickPage(evt) {
  let el = evt.target.closest("[data-state]");
  if (!el) return;
  evt.preventDefault();
  searchMovie( el.dataset.name, el.dataset.page)
}

let pagination = document.querySelector('.parent-counter');

pagination.addEventListener("click" , evt=>{
  evt.preventDefault()
  clickPage(evt)
})

