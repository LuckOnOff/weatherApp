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
const labelBlock = document.querySelector('.search-form__label');

function searchLocation() {
    const apiKey = 'ddef709b3b5d7802c80cea203525df01';
    const city = input.value;

    if(city === '')
        return;

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`)
    .then(Response => Response.json()).then(json => {
        console.log(json)
        if(json.cod === '404') {
            container.style.height = '370px';
            error404.style.display = 'flex';
            error404.classList.add('fade-in');
            weatherBox.classList.add('fade-in');
            weatherBoxNormal.style.display = 'none';
            return;
        }


        error404.style.display = 'none';
        error404.classList.remove('fade-in');
        container.style.height = '400px';
        weatherBoxNormal.style.display = 'flex';
        weatherBoxNormal.classList.add('fade-in');
        weatherBox.classList.add('fade-in');


        currentTemp.innerHTML = `${parseInt(json.main.temp)}<span> °C</span>`;
        currentHumidity.innerHTML = json.main.humidity;
        currentWindSpeed.innerHTML = json.wind.speed.toFixed(1);

        if(json.weather[0].id >= 200 && json.weather[0].id <= 232) {
            tempTextSpan.innerHTML = 'Грозы';
            backGroundImg.src = 'img/thunderstorm.svg';
        }else if(json.weather[0].id >= 300 && json.weather[0].id <= 321) {
            tempTextSpan.innerHTML = 'Морось';
            backGroundImg.src = 'img/drizzle.svg';
        }else if(json.weather[0].id >= 500 && json.weather[0].id <= 531) {
            tempTextSpan.innerHTML = 'Дождь';
            backGroundImg.src = 'img/rain.svg';
          }else if(json.weather[0].id >= 600 && json.weather[0].id <= 622) {
              tempTextSpan.innerHTML = 'Снег';
              backGroundImg.src = 'img/snow.svg';
          }else if(json.weather[0].id >= 701 && json.weather[0].id <= 781) {
            tempTextSpan.innerHTML = 'Туман';
            backGroundImg.src = 'img/fog.svg';
        } else if(json.weather[0].id == 800) {
            tempTextSpan.innerHTML = 'Ясно';
            backGroundImg.src = 'img/sun.svg';
        }else if(json.weather[0].id >= 801 && json.weather[0].id <= 804) {
            tempTextSpan.innerHTML = 'Облачно';
            backGroundImg.src = 'img/sunCloud.svg';
        }

    })

};
input.addEventListener('change', searchLocation);
