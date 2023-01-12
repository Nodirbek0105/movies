var elUL = document.querySelector('[data-ul]');
var elUL2 = document.querySelector('[data-ul2]');
var elinput = document.querySelector('[data-input]');
var elinput1 = document.querySelector('[data-input1]');
var elinput2 = document.querySelector('[data-input2]');
var elform = document.querySelector('[data-form]');


elform.addEventListener('submit',function (evt){
  evt.preventDefault();
    var elli = document.createElement("li")
    var elspan = document.createElement("span")
    var elimg = document.createElement("img")
    elspan.setAttribute("data-elspan" , "")
    elUL2.appendChild(elli)
    elli.appendChild(elspan)
    elli.appendChild(elimg)
    elimg.style.marginTop = "100px"
    elspan.style.marginBottom = "100px"
    elli.style.display = "contents"
    elspan.style.color = "rgba(255 , 255 , 255 , 0.9)"
    elspan.style.padding = "10px"
    elspan.style.backgroundColor = "rgba(0 , 0 , 0 , 0.3)"
    elimg.setAttribute("src" , `${elinput2.value}`)
    elspan.textContent=`name ${(elinput.value)} - rating   \u{2B50}${elinput1.value}\u{2B50}`
    elinput.value = ""
    elinput1.value = ""
    elinput2.value = ""
});

for (let i = 0; i < movies.length; i++) {
    const element = movies[i];
    var elli = document.createElement("li")
    var elspan = document.createElement("span")
    var elimg = document.createElement("img")
    // elspan.setAttribute("data-elspan" , "")
    elUL.appendChild(elli)
    elli.appendChild(elimg)
    elli.appendChild(elspan)
    elimg.style.marginTop = "100px"
    elimg.style.border = "5px solid black"
    elspan.style.marginBottom = "100px"
    elli.style.position="relative"
    elli.style.backgroundImage = `url(https://image.tmdb.org/t/p/w500${element.poster_path})`
    elli.style.margin ="50px"
    elli.style.alignItems ="center"
    elli.style.padding = "10px"
    elli.style.listStyle = "none"
    elli.style.gap ="25px"
    elli.style.display = "contents"
    elspan.style.color = "rgba(255 , 255 , 255 , 0.9)"
    elspan.style.padding = "10px"
    elspan.style.backgroundColor = "rgba(0 , 0 , 0 , 0.3)"
    elimg.setAttribute("src" , `https://image.tmdb.org/t/p/w500${element.poster_path}`)
    if(element.original_title!=element.title){
      elspan.textContent=`name in ENGLISH 🇺🇸 ${(element.title)} 🇺🇸 original name 📄${(element.original_title)}📄 - rating   \u{2B50}${element.vote_average}\u{2B50}`
    }if(element.original_title===element.title){
      elspan.textContent=`name of film 📄${(element.original_title)}📄 - rating   \u{2B50}${element.vote_average}\u{2B50}`
    }
}
