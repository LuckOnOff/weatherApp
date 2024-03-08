'use strict';
const container = document.querySelector('.container');
const input = document.querySelector('.search-form__input');
const weatherBox = document.querySelector('.weather-box');
const error404 = document.querySelector('.weather-box-error');
const weatherBoxNormal = document.querySelector('.weather-box-normal');
const currentTemp = document.querySelector('.weather-box-normal__current-temp-value');
const tempTextSpan = document.querySelector('.weather-box-normal__current-temp-text span');
const currentHumidity = document.querySelector('.weather-box-normal__current-humidity-value span');
const currentWindSpeed = document.querySelector('.weather-box-normal__wind-speed-value span');
const backGroundImg = document.querySelector('.weather-box-normal__current-temp-img');

function errorBlock() {
    container.style.height = '370px';
    error404.style.display = 'flex';
    error404.classList.add('fade-in');
    container.classList.add('fade-in');
    weatherBoxNormal.style.display = 'none';
}

function completeBlock() {
    error404.style.display = 'none';
    error404.classList.remove('fade-in');
    container.style.height = '400px';
    weatherBoxNormal.style.display = 'flex';
    weatherBoxNormal.classList.add('fade-in');
    container.classList.add('fade-in');
}

function searchLocation() {
    const apiKey = 'ddef709b3b5d7802c80cea203525df01';
    const city = input.value.trim();

    if(city === '' || !isNaN(city)) {
        return;
    }

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}&lang=ru`)
    .then(response => response.json())
    .then(json => {
        if(json.cod === '404') {
            return errorBlock(); // если запрос неверный
        }

        completeBlock(); // если запрос верный

        currentTemp.innerHTML = `${parseInt(json.main.temp)}<span> °C</span>`;
        currentHumidity.textContent = json.main.humidity;
        currentWindSpeed.textContent = json.wind.speed.toFixed(1);
        tempTextSpan.textContent = json.weather[0].description;

        const weatherConditions = {
            1: 'img/thunderstorm.svg',
            2: 'img/drizzle.svg',
            3: 'img/rain.svg',
            4: 'img/snow.svg',
            5: 'img/fog.svg',
            6: 'img/sun.svg',
            7: 'img/sunCloud.svg'
        }
        
        const weatherId = json.weather[0].id;
        let weatherType;
        
        if (weatherId >= 200 && weatherId <= 232) {
            weatherType = 1;
        } else if (weatherId >= 300 && weatherId <= 321) {
            weatherType = 2;
        } else if (weatherId >= 500 && weatherId <= 531) {
            weatherType = 3;
        } else if (weatherId >= 600 && weatherId <= 622) {
            weatherType = 4;
        } else if (weatherId >= 701 && weatherId <= 781) {
            weatherType = 5;
        } else if (weatherId == 800) {
            weatherType = 6;
        } else if (weatherId >= 801 && weatherId <= 804) {
            weatherType = 7;
        }
        
        backGroundImg.src = weatherConditions[weatherType]; // отображение картинки погоды в зависимости от кода с сервера
    })
    .catch(e => {
        alert(`Извините, произошла непредвиденная ошибка: \n ${e}`);
        errorBlock();
    }); // обработка асинхронных ошибок
};
input.addEventListener('change', searchLocation);