/* Chiamate Asincrone:  */
// SetInterval(): Crea un loop infinito in cui possiamo gestire la durata delle singole interazioni.
// Il setInterval è una funzione che vuole due parametri. il primo parametro è la callback, il secondo è l'itervallo di tempo che deve passare tra una interazione e l'altra. 
// ClearInterval(): pulire un intervallo e interromperlo
// setTimeout: fa partire un blocco di istruzioni dopo tot secondi 


let firstNumber = document.querySelector('#firstNumber');
let secondNumber = document.querySelector('#secondNumber');
let thirdNumber = document.querySelector('#thirdNumber');

let confirm = true;

function createInterval(n, element, time) {
    let counter = 0;

    let interval = setInterval(() => {
        if (counter < n) {
            counter++;
            element.innerHTML = counter;
        } else {
            console.log('Adesso mi fermo');
            clearInterval(interval);
        }
    }, time);

    setTimeout(() => { 
        confirm = true;
        }, 8000);
}


// IntersectionObserver: è una Classe del browser che si occupa di far scattare una funzione nel momento in cui il browser sono visibili gli elementi html che noi gli indichiamo
// è una keyword che mi permette di GENERARE UN OGGERRO partendo da una Classe

// Nella variabile stiamo creand un oggetto di classe intersectionObserserver
// In questo oggetto scatta una CallBack la quale accetta un qualsiasi numero di parametri e li salva nel parametro formale entries che + un array
let observer = new IntersectionObserver( (entries)=>{
// entries = [firstNumber]
    entries.forEach( (entry)=> { 
        if(entry.isIntersecting && confirm){ 
           createInterval(100, firstNumber, 100);
           createInterval(200, secondNumber, 50);
           createInterval(300, thirdNumber, 20);
           confirm = false;
        }
    });
 });

 observer.observe(firstNumber);

 // star

let reviews = [
    { user: 'Matteo', description: 'Il più bel sito di annunci del mondo', rank: 5 },
    { user: 'Alin', description: 'Veramente non mi da di niente', rank: 1 },
    { user: 'Michael', description: 'Mi piace tranne per Star Trek', rank: 3 },
    { user: 'Arina', description: 'Star ears è meglio', rank: 5 },
]

 // star = [
 // div
  // div
   // div
    // div
    //]

let swiperWrapper = document.querySelector('.swiper-wrapper');

    reviews.forEach( (recensione)=>{ 
        let div = document.createElement('div');
        div.classList.add('swiper-slide');
        div.innerHTML = `
        <div class="card-review">
    <p class="lead text-center">${recensione.description}</p>
    <p class="h4 text center">${recensione.user}</p>
    <div class="d-flex justify-content-center star">
      
      </div>
    </div>
        `;
        swiperWrapper.appendChild(div);
    });
    
    let stars = document.querySelectorAll('.star');

    // <i class="fa-solid fa-star"></i>

stars.forEach((star, index) => {
    for (let i = 1; i <= reviews[index].rank; i++) {
        let icon = document.createElement('i');
        icon.classList.add('fa-solid', 'fa-star');
        star.appendChild(icon);
    }

    let difference = 5 - reviews[index].rank;

    for (let i = 1; i <= difference; i++) {
        let icon = document.createElement('i');
        icon.classList.add('fa-regular', 'fa-star');
        star.appendChild(icon);
    }
});







 // Swiper

const swiper = new Swiper('.swiper', {
    // Optional parameters
    effect: 'flip',
    grabCursor: true,
    loop: true,

    // Navigation arrows
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },

    autoplay: {
        delay: 2000
    },
});
