let days = ["sunday", "monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]

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
}

function search(city) {
    let apiKey = "d57ba12fe2c36fb7d6e4a542d490147c";
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