/* eslint-disable indent */
/* eslint-disable linebreak-style */
// import fetch

const fetch = require('node-fetch');
// JSON response -- temperature
const location = 'http://api.openweathermap.org/data/2.5/weather?q=Philadelphia,usa&appid=ad197b2a2b21e5c149be54d637d642ca';

function displayText(obj) {
    const myDiv = document.createElement('div');
    myDiv.setAttribute('id', 'displayTextID');
    myDiv.classList.add('big');
    console.log('inside displayText');
    myDiv.innerHTML = obj;
    myDiv.style.height = '20px';
    document.body.appendChild(myDiv);
}
function displayImage(obj) {
    const myImg = document.createElement('img');
    myImg.setAttribute('id', 'imageID');
    // myImg.classList.add('big');
    console.log('inside display');
    myImg.src = obj;
    console.log(`image id inside display${document.getElementById('imageID')}`);
    myImg.style.width = '150px';
    myImg.style.height = '150px';

    document.body.appendChild(myImg);
}

function helper(obj) {
    console.log('inside helper');
    displayImage(obj);
}

async function getGif(rainfall) {
    let response = '';
    // let obj = "";
    if (rainfall !== 'Clouds') {
        response = await fetch(
            'https://api.giphy.com/v1/gifs/search?q=sunny&api_key=27053wi1Fj01BToaCa2lkxuUMuSPBR4Z&limit=5',
        )
            .then((res) => res.json())
            .then((data) => helper(data.data[0].images.preview_gif.url));
    } else {
        response = await fetch(
            'https://api.giphy.com/v1/gifs/search?q=rainy&api_key=27053wi1Fj01BToaCa2lkxuUMuSPBR4Z&limit=5',
        )
            .then((res) => res.json())
            .then((data) => helper(data.data[0].images.preview_gif.url));
    }

    return response;
}

async function showResult() {
    // console.log("hello");
    const city = document.getElementById('city');
    // let x = '';
    // const key = 'b95155b3024f916e8f7ce434c045144c';
    console.log(city.value);

    const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city.value}&APPID=b95155b3024f916e8f7ce434c045144c&units=imperial`,
    )
        .then((res) => res.json())
        .catch((e) => console.log(e));

    return response;
}

async function fetchWeather() {
    const response = await fetch(location);
    return response.json();
}

module.exports = {
    fetchWeather,
    displayText,
    showResult,
    getGif,
    helper,
    displayImage,
};
