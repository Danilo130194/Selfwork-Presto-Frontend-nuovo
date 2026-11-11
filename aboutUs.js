
let opener = document.querySelector('.opener');
let circle = document.querySelector('.circle');

let teachers = [
    {name: 'Matteo', description: 'Docente Frontend di Hackademi 69', url: './media/profilo1.jpg'},
    {name: 'Marco', description: 'Docente frontend e responsabile Hackademy', url: './media/profilo2.jpg'},
    {name: 'Nicola', description: 'Docente frontend noto come sex simbol', url: './media/profilo3.jpg'},
    {name: 'Davide', description: 'Docente frontend di Hackademy 69', url: './media/profilo4.jpg'},
];

teachers.forEach((docente) => {
    let div = document.createElement('div');
    div.classList.add('moved');
    div.style.backgroundImage = `url(${docente.url})`;
    circle.appendChild(div);
});

let movedDivs = document.querySelectorAll('.moved');

let isOpen = false;

opener.addEventListener('click', () => {

    if (isOpen == false) {

        opener.style.transform = `rotate(45deg)`;

        movedDivs.forEach((moved, i) => {

            let angle = (360 * i) / movedDivs.length;

moved.style.transform =
    `rotate(${angle}deg) translate(105px) rotate(-${angle}deg)`;
        });

        isOpen = true;

    } else {

        isOpen = false;

        opener.style.transform = ``;

        movedDivs.forEach((moved, i) => {

            moved.style.transform = ``;

        });
        flipCard.classList.add('d-none');
    }

});

let innerFace = document.querySelector('.inner-face');
let cardName = document.querySelector('#cardName');
let cardDescription = document.querySelector('#cardDescription');
let flipCard = document.querySelector('.flip-card');

movedDivs.forEach((moved,i) => {
    moved.addEventListener('click', () => {
        flipCard.classList.remove('d-none');
        let docente = teachers[i];
        innerFace.style.backgroundImage = `url(${docente.url})`; 
        cardName.innerHTML = docente.name;
        cardDescription.innerHTML = docente.description;
    });
    });
