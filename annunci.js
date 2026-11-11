// .json: JavaScript Object Notation

// API: chiavi che ci permettono di raggiungere un .json online

// fetch(): chiamata asincrona che ci permette di collegarci a un JSON e di estrarre un dato con una promise.

// .then(): questo metodo permette di convertire la promise nel dato strutturale e di poterlo utilizzare con JS.

// 1. fetch() = collega al .json e ne ottengo una promise
// 2. then() = converto la promise in un dato strutturale JS
// 3. then() = utilizzo il dato ottenuto.

// .json(): è un metodo di response che mi permette di convertire i dati JSON in un oggetto JS.


fetch('./annunci.json').then((response) => response.json()).then((data) => {

    data.sort((a, b) => a.price - b.price);


    let radioWrapper = document.querySelector('#radioWrapper');
    let cardWrapper = document.querySelector('#cardWrapper');


    function radioCreate() {

        let categories = data.map((annuncio) => annuncio.category);


        // let uniqueCategories = [];

        // !True
        // !false

        // categories.forEach((category) => {
        //     if (!uniqueCategories.includes(category)) {
        //         uniqueCategories.push(category);
        //     }
        // });


        // Set(): classe che mi restituisce, partendo da un nuovo array, un nuovo oggetto di tipo Set il quale contiene valori univoci.

        // Array.from(): mi permette di convertire un array-like in un array.

        let uniqueCategories = Array.from(new Set(categories));

        // Aggiungo la categoria All per poter visualizzare tutti gli annunci.
        let allCategories = ['All', ...uniqueCategories];


        allCategories.forEach((category, i) => {

            let div = document.createElement('div');
            div.classList.add('form-check');

            div.innerHTML = `

                <input class="form-check-input" type="radio" name="categories" id="${category}" ${i === 0 ? 'checked' : ''}>
                <label class="form-check-label" for="${category}">
                    ${category}
                </label>

            `;

            radioWrapper.appendChild(div);

        });

    }


    radioCreate();


    // Recupero tutti i radio button dopo averli creati.
    let radioButtons = document.querySelectorAll('input[name="categories"]');


    function truncateWord(string) {

        if (string.length > 15) {
            return string.split(' ')[0] + '...';
        } else {
            return string;
        }

    }


    function showCards(array) {

        cardWrapper.innerHTML = '';

        array.forEach((annuncio, i) => {

            let div = document.createElement('div');
            div.classList.add('card-custom');

            div.innerHTML = `

                <img src="https://picsum.photos/${300 + i}" alt="immagine casuale" class="img-fluid img-card">

                <p class="h2" title="${annuncio.name}">${truncateWord(annuncio.name)}</p>

                <p class="h4">${annuncio.category}</p>

                <p class="lead">${annuncio.price} €</p>

            `;

            cardWrapper.appendChild(div);

        });

    }


    showCards(data);


    function filterByCategory(array) {

        // In questa funzione ho bisogno di ottenere un nuovo array partendo da data e gli elementi del nuovo array dovranno soddisfare la condizione per la quale la loro category sia uguale alla categoria che stiamo passando alla funzione.

        // La categoria voglio trovarla partendo dalla lista di tutti i bottoni e usare il metodo .find() sugli array su questa lista. La condizione da usare è il bottone che possiede l'attributo checked.

        let arrayFromNodeList = Array.from(radioButtons);

        let button = arrayFromNodeList.find((bottone) => bottone.checked);

        let categoria = button.id;


        // let categoria = Array.from(radioButtons).find((button) => button.checked).id;


        if (categoria != 'All') {

            let filtered = array.filter((annuncio) => annuncio.category == categoria);

            return filtered;

        } else {

            return array;

        }

    }


    radioButtons.forEach((button) => {

        button.addEventListener('click', () => {
            setPriceInput(filterByCategory(data));

            globalFilter();

        });

    });


    let priceInput = document.querySelector('#priceInput');
    let priceValue = document.querySelector('#priceValue');


    function setPriceInput(array) {

        // Dopo avere catturato l'input voglio settare max dello stesso al valore più alto tra i price di ogni prodotto.

        // Per farlo avrò quindi bisogno di un array che contenga solo i prezzi, a quel punto lo ordino in maniera crescente/decrescente e prendo l'elemento con il valore più alto.

        let prices = array.map((annuncio) => +annuncio.price);

        prices.sort((a, b) => a - b);

        let maxPrice = Math.ceil(prices.pop());

        priceInput.max = maxPrice;

        priceInput.value = maxPrice;

        priceValue.innerHTML = maxPrice;

    }


    setPriceInput(filterByCategory(data));


    function filterByPrice(array) {

        let filtered = array.filter((annuncio) => +annuncio.price <= priceInput.value);

        return filtered;

    }


    priceInput.addEventListener('input', () => {

        priceValue.innerHTML = priceInput.value;

        globalFilter();

    });


    let wordInput = document.querySelector('#wordInput');


    function filterByWord(array) {

        let filtered = array.filter((annuncio) =>
            annuncio.name.toLowerCase().includes(wordInput.value.toLowerCase())
        );

        return filtered;

    }


    wordInput.addEventListener('input', () => {

        globalFilter();

    });


    // Quello di cui abbiamo bisogno è che ad ogni evento scattino tutte e tre le funzioni di filtro, ma non siano applicate tutte e tre ad array data, bensì siano concatenate e ognuna filtri il risultato della funzione di filtro precedente.


    function globalFilter() {

        let filteredByCategory = filterByCategory(data);

        // Corretto il nome della funzione: filterByPrice e non filterByCategoryPrice.
        let filteredByPrice = filterByPrice(filteredByCategory);

        let filteredByWord = filterByWord(filteredByPrice);

        // Array filtrato per categoria, prezzo e parola.
        showCards(filteredByWord);

    }


});