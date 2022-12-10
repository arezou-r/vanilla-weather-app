let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
let forecastDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

function formatDate(timestamp) {
    let date = new Date(timestamp);
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let day = days[date.getDay()];

    if (minutes < 10) {
        minutes = `0${minutes}`
    }
    if (hours < 10) {
        hours = `0${hours}`
    }
    return `${day} ${hours}:${minutes}`
}


// let apiKey = "7059cb165caa3316bff682d263a01b1e";
let apiKey2 = "3794cado846aa024tdda83fba00effa9";
let apiKey = "d57ba12fe2c36fb7d6e4a542d490147c";
let cityNameEmelent = document.querySelector("#city");
let descriptionEmelent = document.querySelector("#description");
let tempElement = document.querySelector("#temperature");
let humidityEmelent = document.querySelector("#humidity");
let windEmelent = document.querySelector("#wind");
let dateElement = document.querySelector("#date");
let iconElement = document.querySelector("#icon");
let formElement = document.querySelector("#search_form");
let cityInputElement = document.querySelector("#city_input");
let farLinkElement = document.querySelector("#fahrenheit_link");
let celsiusLinkElement = document.querySelector("#celsius_link");


let forecastElement = document.querySelector("#forecast .row");

function formatDay(timestamp) {
    let date = new Date(timestamp * 1000);
    let day = forecastDays[date.getDay()]
    return day;
}

function displayForecast(response) {
    console.log(response)
    let forcastData = response.data.daily;
    let forecastHtml = "";
    forcastData.forEach(function(forecastDay, index) {
        if (index < 6) {
            forecastHtml = forecastHtml + `
                <div class="col">
                    <div class="forecast_box">
                        <p class="forecast_date">${formatDay(forecastDay.time)}</p>
                        <img src="http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${forecastDay.condition.icon}.png" class="forecast_icon" alt="img">
                        <div class="forecast_temp">
                            <span class="forcast_temp_max">${Math.round(forecastDay.temperature.maximum)}° </span>
                            <span class="forcast_temp_min">${Math.round(forecastDay.temperature.minimum)}°</span>
                        </div>
                    </div>
                </div>
            `;
        }
    });

    forecastElement.innerHTML = forecastHtml;
}

function getForecast(cityName) {
    // let apiUrl = `https://api.openweathermap.org/data/3.0/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
    let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${cityName}&key=${apiKey2}&units=metric`
    axios.get(apiUrl).then(displayForecast);
}

function displayInfo(response) {
    console.log(response);
    celsiusTemp = response.data.main.temp;
    tempElement.innerHTML = Math.round(celsiusTemp);
    cityNameEmelent.innerHTML = response.data.name;
    descriptionEmelent.innerHTML = response.data.weather[0].description;
    humidityEmelent.innerHTML = response.data.main.humidity;
    windEmelent.innerHTML = Math.round(response.data.wind.speed);

    dateElement.innerHTML = formatDate(response.data.dt * 1000);
    iconElement.setAttribute("src", `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
    iconElement.setAttribute("alt", `${response.data.weather[0].description}`);

    getForecast(response.data.name);

}

function search(city) {
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    axios.get(apiUrl).then(displayInfo);
}

function handleSubmit(event) {
    event.preventDefault();
    search(cityInputElement.value);
}

formElement.addEventListener("submit", handleSubmit);

function showFarTemp(event) {
    event.preventDefault();
    let farTemp = Math.round((celsiusTemp * 9) / 5 + 32);
    tempElement.innerHTML = farTemp;
}

function showCelsiusTemp(event) {
    event.preventDefault();
    tempElement.innerHTML = Math.round(celsiusTemp);
}

let celsiusTemp = null;

farLinkElement.addEventListener("click", showFarTemp);
celsiusLinkElement.addEventListener("click", showCelsiusTemp);

search("london");