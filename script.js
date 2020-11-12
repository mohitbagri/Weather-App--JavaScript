/* eslint-disable indent */
/* eslint-disable func-names */
/* eslint-disable no-return-assign */
/* eslint-disable no-console */
let counter = 0;

function displayText(obj) {
    const city = document.getElementById('city');
    const myDiv = document.createElement('div');
    myDiv.id = `${city.value}${counter}`;
    // myDiv.classList.add('big');
    console.log('inside display');
    myDiv.innerHTML = `${city.value} ${obj}K`;
    myDiv.style.height = '20px';
    document.body.appendChild(myDiv);
}

function displayImage(rainfall, obj) {
    const city = document.getElementById('city');
    const myTextDiv = document.getElementById(city.value + counter);
    myTextDiv.innerHTML += ` ${rainfall}`;
    counter += 1;

    const myDiv = document.createElement('img');
    myDiv.id = 'myDiv';

    console.log('inside displayImage');
    myDiv.src = obj;
    myDiv.style.width = '150px';
    myDiv.style.height = '150px';

    const temp = document.createElement('div');
    temp.className = 'big';
    temp.appendChild(myTextDiv);
    temp.appendChild(myDiv);
    document.body.appendChild(temp);
}

function helper(rainfall, obj) {
    console.log('inside helper');
    console.log(obj);
    displayImage(rainfall, obj);
}

async function getGif(rainfall) {
    let response = '';
    let obj = '';
    if (rainfall !== 'Clouds') {
        response = await fetch(
            'https://api.giphy.com/v1/gifs/search?q=sunny&api_key=27053wi1Fj01BToaCa2lkxuUMuSPBR4Z&limit=5',
        )
            .then((res) => res.json())
            .then((data) => (obj = data.data[0].images.preview_gif.url))
            .then(() => helper(rainfall, obj));
    } else {
        response = await fetch(
            'https://api.giphy.com/v1/gifs/search?q=rainy&api_key=27053wi1Fj01BToaCa2lkxuUMuSPBR4Z&limit=5',
        )
            .then((res) => res.json())
            .then((data) => (obj = data.data[0].images.preview_gif.url))
            .then(() => helper(rainfall, obj));
    }

    return response;
}

function helper2(temp, rainfall) {
    displayText(temp);
    getGif(rainfall);
}

async function showResult() {
    let obj2 = '';
    let obj3 = '';
    // console.log("hello");
    const city = document.getElementById('city');
    // let x = '';
    // const key = 'b95155b3024f916e8f7ce434c045144c';
    console.log(city.value);

    const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city.value}&APPID=b95155b3024f916e8f7ce434c045144c&units=imperial`,
    )
        .then((res) => res.json())
        // eslint-disable-next-line no-return-assign
        .then((data) => [(obj2 = data.main.temp), (obj3 = data.weather[0].main)])
        // eslint-disable-next-line no-undef
        .then(() => helper2(obj2, obj3));

    return response;
}

function main() {
    const showButton = document.getElementById('submit');

    // let obj;

    if (showButton) {
        showButton.addEventListener('click', showResult);
    }
}

(function () {
    main();
}());
