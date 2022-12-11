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


let apiKey = "3794cado846aa024tdda83fba00effa9";
let cityNameEmelent = document.querySelector("#city");
let descriptionEmelent = document.querySelector("#description");
let tempElement = document.querySelector("#temperature");
let humidityEmelent = document.querySelector("#humidity");
let windEmelent = document.querySelector("#wind");
let dateElement = document.querySelector("#date");
let iconElement = document.querySelector("#icon");
let formElement = document.querySelector("#search_form");
let cityInputElement = document.querySelector("#city_input");


let forecastElement = document.querySelector("#forecast .row");

function formatDay(timestamp) {
    let date = new Date(timestamp * 1000);
    let day = forecastDays[date.getDay()]
    return day;
}

function displayForecast(response) {
    let forcastData = response.data.daily;
    let forecastHtml = "";
    forcastData.forEach(function(forecastDay, index) {
        if (index < 6) {
            forecastHtml = forecastHtml + `
                <div class="col">
                    <a href="#" class="forecast_box">
                        <p class="forecast_date">${formatDay(forecastDay.time)}</p>
                        <img src="http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${forecastDay.condition.icon}.png" class="forecast_icon" alt="img">
                        <div class="forecast_temp">
                            <span class="forcast_temp_max">${Math.round(forecastDay.temperature.maximum)}° </span>
                            <span class="forcast_temp_min">${Math.round(forecastDay.temperature.minimum)}°</span>
                        </div>
                    </a>
                </div>
            `;
        }
    });

    forecastElement.innerHTML = forecastHtml;
}

function getForecast(cityName) {
    let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${cityName}&key=${apiKey}&units=metric`
    axios.get(apiUrl).then(displayForecast);
}

function displayInfo(response) {
    let celsiusTemp = response.data.temperature.current;
    tempElement.innerHTML = Math.round(celsiusTemp);
    cityNameEmelent.innerHTML = response.data.city;
    descriptionEmelent.innerHTML = response.data.condition.description;
    humidityEmelent.innerHTML = response.data.temperature.humidity;
    windEmelent.innerHTML = Math.round(response.data.wind.speed);

    dateElement.innerHTML = formatDate(response.data.time * 1000);

    iconElement.setAttribute("src", `http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${response.data.condition.icon}.png`);
    iconElement.setAttribute("alt", `${response.data.condition.description}`);

    getForecast(response.data.city);

}

function search(city) {
    let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
    axios.get(apiUrl).then(displayInfo);
}

function handleSubmit(event) {
    event.preventDefault();
    search(cityInputElement.value);
}

formElement.addEventListener("submit", handleSubmit);

search("Tehran");