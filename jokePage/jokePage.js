(function () {
    'use strict';


    const rSButton = document.getElementById('rSButton');
    const dadjButton = document.getElementById('dadJButton');
    const cnjButton = document.getElementById('cnJButton');
    const saveBs = document.getElementsByClassName('saveB');
    const faveBs = document.getElementsByClassName('faveB');


    const savedB = document.getElementById('savedB');
    const favesB = document.getElementById('favesB');
    const saveDisplay = document.getElementById('savedDisplay');
    const faveDisplay = document.getElementById('faveDisplay');

    let saveCounter = 1;
    let saveArr = [];
    let lastNumber = localStorage.getItem('lastNumber') ?? 0;
    lastNumber++;
    let faveArr = JSON.parse(localStorage.getItem('arr')) ?? [];

    //loads dad jokes onClick
    dadjButton.addEventListener('click', async () => {
        let stuff = await loadJson("https://icanhazdadjoke.com/ ");
        editDisplay('dadJDisplay', stuff.joke);
        removeDisableds(dadjButton)
    });

    //loads chuck norris jokes onClick
    cnjButton.addEventListener('click', async () => {
        let stuff = await loadJson("https://api.chucknorris.io/jokes/random");
        editDisplay('cnJDisplay', stuff.value);
       removeDisableds(cnjButton)
    });

    //loads ron swanson quotes onClick
    rSButton.addEventListener('click', async () => {
        let stuff = await loadJson("https://ron-swanson-quotes.herokuapp.com/v2/quotes ");
        editDisplay('rsQuotesDisplay', stuff);
        removeDisableds(rSButton);
    });

    //switches to saved tab
    savedB.addEventListener('click', () => {
        faveDisplay.style.display = 'none';
        saveDisplay.style.display = 'block';
        savedB.style.backgroundColor = 'lightblue';
        favesB.style.backgroundColor = 'lightgray';
    });

    //switches to favorites tab
    favesB.addEventListener('click', () => {
        saveDisplay.style.display = 'none';
        faveDisplay.style.display = 'block';
        favesB.style.backgroundColor = 'lightblue';
        savedB.style.backgroundColor = 'lightgray';

        //get fave arr from local storage and display it
        let localStorageArray = JSON.parse(localStorage.getItem('arr'));
        if (faveDisplay.innerText === '') {
            faveDisplay.style.fontStyle = 'normal';
            setFaveDisplayFromLocalStorage(localStorageArray);
        }

    });

    //When save button is clicked, adds current joke to saved display 
    for (let i = 0; i < saveBs.length; i++) {
        const button = saveBs[i];
        button.addEventListener('click', () => {
            let text = button.closest('.container').querySelector('.display').innerHTML;
            if (text !== '' && saveDisplay.style.display !== 'none') {
                saveArr.push({ number: saveCounter, joke: text });
                setSaveDisplay(saveArr,true);
                saveCounter++;
                button.setAttribute('disabled', 'disabled')
            }
        })
    }

    //When favorites button is clicked, saves joke to localStorage, and adds it to favorites tab
    for (let i = 0; i < faveBs.length; i++) {
        const button = faveBs[i];
        button.addEventListener('click', () => {

            let text = button.closest('.container').querySelector('.display').innerHTML;
            if (text !== '' && faveDisplay.style.display !== 'none') {
                faveArr.push({ number: lastNumber, joke: text })
                localStorage.setItem('arr', JSON.stringify(faveArr));
                localStorage.setItem('lastNumber', lastNumber);
                setFaveDisplayFromLocalStorage(faveArr,true);
                lastNumber++;
                button.setAttribute('disabled', 'disabled')
            }
        })
    }

    //delete joke and remove it from favorites array
    document.body.addEventListener('click', event => {
        if (event.target.className === 'faveDeleteBs') {
            let parentDiv = event.target.parentElement;
            let jokeNumber = parentDiv.innerText.charAt(0);

            let localStorageArray = JSON.parse(localStorage.getItem('arr'));
            let filteredArray = localStorageArray.filter(joke => joke.number != jokeNumber)

            for (let i = jokeNumber - 1; i < filteredArray.length; i++) {
                let fn = filteredArray[i].number - 1
                filteredArray[i].number = fn
            }

            parentDiv.remove();

            let localStorageLastNumber = localStorage.getItem('lastNumber');
            let ln = localStorageLastNumber - 1;
            localStorage.setItem('lastNumber', ln);

            lastNumber = ln + 1;
            faveArr = filteredArray;

            setFaveDisplayFromLocalStorage(filteredArray);

            localStorage.setItem('arr', JSON.stringify(filteredArray));
        }
    })

    //delete joke and remove from save array
    document.body.addEventListener('click', event => {
        if (event.target.className === 'saveDeleteBs') {
            let parentDiv = event.target.parentElement;
            let jokeNumber = parentDiv.innerText.charAt(0);

            let filteredArray = saveArr.filter(joke => joke.number != jokeNumber)

            for (let i = jokeNumber - 1; i < filteredArray.length; i++) {
                let fn = filteredArray[i].number - 1
                filteredArray[i].number = fn
            }
            saveArr = filteredArray;

            let temp = saveCounter - 1;
            saveCounter = temp;

            setSaveDisplay(saveArr)
            parentDiv.remove();
        }
    })

//goes into local storeage and sets the Fave Display
    function setFaveDisplayFromLocalStorage(localStorageArray, saveOrDelete) {
        faveDisplay.innerText = ''
        for (let i = 0; i < localStorageArray.length; i++) {
            let index = localStorageArray[i];
            let div = createDiv();
            let deleteButton = createDeleteButton('faveDeleteBs');

            div.innerHTML = index.number + '. ' + index.joke;
            div.append(deleteButton);
            faveDisplay.append(div);
            if (saveOrDelete) {
                div.scrollIntoView();
            }
        }
    }

//sets Save Display
    function setSaveDisplay(saveArr,saveOrDelete) {
        saveDisplay.innerText = ''
        for (let i = 0; i < saveArr.length; i++) {
            let index = saveArr[i];
            let div = createDiv();
            let deleteButton = createDeleteButton('saveDeleteBs');
            div.innerHTML = index.number + '. ' + index.joke;
            div.append(deleteButton);
            saveDisplay.append(div);
            if(saveOrDelete){
                 div.scrollIntoView();
            }
           
        }
    }

    function createDeleteButton(className) {
        let button = document.createElement('button');
        button.className = className;
        button.innerText = 'Delete';
        button.style.float = 'right';
        return button
    }

    function createDiv() {
        let div = document.createElement('div');
        div.className = 'jokes';
        div.style.overflow = 'hidden';
        div.style.margin = '5px';
        return div;
    }

    //removes disabled attributes from save and favorite buttons
    function removeDisableds(button){
        button.parentNode.querySelector('.saveB ').removeAttribute('disabled');
        button.parentNode.querySelector('.faveB').removeAttribute('disabled');
    }

    //function that takes the chosen display, and adds text to it
    function editDisplay(whichDisplay, text) {
        console.log(whichDisplay);
        let display = document.getElementById(whichDisplay);
        display.innerHTML = text;
    }

    //function to load JSON
    async function loadJson(url, options = { method: 'GET', headers: { Accept: "application/json" } }) {
        try {
            const response = await fetch(url, options);
            if (!response.ok) {
                throw new Error(`${response.status} ${response.statusText}`);
            }
            return await response.json();

        } catch (error) {
            console.error('OOPS Error', error);
        }
    }
}());