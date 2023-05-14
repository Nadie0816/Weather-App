let now = new Date();

let date = now.getDate();
let hours = now.getHours();
if (hours < 10) {
  hours = `0${hours}`;
}
let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = days[now.getDay()];

let currentTime = document.querySelector(".date");
currentTime.innerHTML = `${day} ${hours}:${minutes}`;

function showSearchWeather(response) {
  let currentTemperature = document.querySelector("#degree");
  let temperature = Math.round(response.data.main.temp);
  currentTemperature.innerHTML = `${temperature}°C`;
  let currentCondition = document.querySelector("#condition");
  currentCondition.innerHTML = `Conditions: ${response.data.weather[0].main}`;
  let currentWind = document.querySelector("#wind");
  currentWind.innerHTML = `Wind: ${response.data.wind.speed} m/s`;
  let currentHumidity = document.querySelector("#humidity");
  currentHumidity.innerHTML = `Humidity: ${response.data.main.humidity} %`;
}

function search(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#city-search");
  let h1 = document.querySelector("h1");
  h1.innerHTML = searchInput.value;
  let apiSearchKey = "5f472b7acba333cd8a035ea85a0d4d4c";
  let apiSearchUrl = `https://api.openweathermap.org/data/2.5/weather?q=${searchCityInput.value}&units=metric&appid=${apiSearchKey}`;
  axios.get(apiSearchUrl).then(showSearchWeather);
}

let form = document.querySelector(".search-form");
form.addEventListener("submit", search);

function showWeather(response) {
  let currentTemperature = document.querySelector(".degree");
  let temperature = Math.round(response.data.main.temp);
  currentTemperature.innerHTML = `${temperature}°C`;
  let currentCondition = document.querySelector("#condition");
  currentCondition.innerHTML = `${response.data.weather[0].main}`;
  let currentWind = document.querySelector("#wind");
  currentWind.innerHTML = `Wind: ${response.data.wind.speed} m/s`;
  let currentHumidity = document.querySelector("#humidity");
  currentHumidity.innerHTML = `Humidity: ${response.data.main.humidity} %`;
  let h1 = document.querySelector("h1");
  h1.innerHTML = `${response.data.name}`;
}

function retrievePosition(position) {
  let apiKey = "5f472b7acba333cd8a035ea85a0d4d4c";
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
  axios.get(url).then(showWeather);
}

function getCurrentPosition() {
  navigator.geolocation.getCurrentPosition(retrievePosition);
}

let current = document.querySelector("#current");
current.addEventListener("click", getCurrentPosition);
