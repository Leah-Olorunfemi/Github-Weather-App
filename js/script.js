// alert("hey");
// In your project, when a user searches for a city (example: New York),
// it should display the name of the city
// on the result page and the current temperature of the city.

// 🙀 Bonus point:
// Add a Current Location button.
//  When clicking on it, it uses the Geolocation API to get your GPS coordinates and
//  display and the city and current temperature using the OpenWeather API.

function formatDate() {
  let appTime = new Date();
  // console.log(appTime);
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let dayDisplayed = days[appTime.getDay()];
  // console.log(dayDisplayed);
  let hourDisplayed = appTime.getHours();
  if (hourDisplayed < 0) hourDisplayed = `0${hourDisplayed}`;

  let minsDisplayed = appTime.getMinutes();
  if (minsDisplayed < 10) minsDisplayed = `0${minsDisplayed}`;

  return `${dayDisplayed} ${hourDisplayed}:${minsDisplayed}`;
}

let appTime = document.querySelector("#date");

appTime.innerHTML = formatDate(appTime);

function displayWeather(response) {
  let descriptionShown = document.querySelector("#wDescription");
  let axiosDescription = response.data.weather[0].main;
  descriptionShown.innerHTML = `${axiosDescription}`;

  let temperatureShown = document.querySelector("#temperature");
  temperatureShown.innerHTML = Math.round(response.data.main.temp);

  let humidityShown = document.querySelector("#humidity");
  let axiosHumidity = response.data.main.humidity;
  humidityShown.innerHTML = `Humidity: ${response.data.main.humidity}%`;

  let windShown = document.querySelector("#wind");
  let axiosWind = Math.round(response.data.wind.speed);
  windShown.innerHTML = `Wind: ${axiosWind} km/h`;

  let cityShown = document.querySelector("h1");
  cityShown.innerHTML = response.data.name;
  let city = response.data.name;

  // console.log(response.data);
  // console.log(response.data.wind);
  //   console.log(response.data.main.temp);
  //   console.log(response.data.main.humidity);
  //   console.log(response.data.name);
  // console.log(response.data.weather[0].main);
}

function search(city) {
  let apiKey = "210d99196a88b9257ed8cb3535a0a0c5";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(displayWeather);
}

function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#city-input").value;
  search(city);
}

function displayCurrentLocationWeather(position) {
  // console.log(position);
  // console.log(position.coords.latitude);
  // console.log(position.coords.longitude);
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiKey = "210d99196a88b9257ed8cb3535a0a0c5";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(displayWeather);
}

function fetchCurrentDetails(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(displayCurrentLocationWeather);
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", handleSubmit);

let currentLocationbtn = document.querySelector("#currentLocationBtn");
currentLocationbtn.addEventListener("click", fetchCurrentDetails);

search("Texas");
