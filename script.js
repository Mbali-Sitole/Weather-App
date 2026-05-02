const apiKey = "ac27c407ef9c66c439a8f85b3d65abbd";
const searchBtn = document.getElementById("search-btn");
const cityInput = document.getElementById("city-input");
const cityName = document.getElementById("city-name");
const temperature = document.getElementById("temperature");
const description = document.getElementById("description");
const humidity = document.getElementById("humidity");
const wind = document.getElementById("wind");
const feelsLike = document.getElementById("feels-like");
const weatherIcon = document.getElementById("weather-icon");
const toggleBtn = document.getElementById("toggle-unit");

let isCelsius = true;
let currentTempC = 0;
let currentFeelsLikeC = 0;

searchBtn.addEventListener("click", function() {
  const city = cityInput.value;

  if (city === "") {
    alert("Please enter a city name!");
    return;
  }

  const url = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + apiKey + "&units=metric";

  fetch(url)
    .then(response => response.json())
    .then(data => {
      cityName.textContent = data.name;
      currentTempC = data.main.temp;
      currentFeelsLikeC = data.main.feels_like;
      temperature.textContent = Math.round(data.main.temp) + "°C";
      description.textContent = data.weather[0].description;
      humidity.textContent = "Humidity: " + data.main.humidity + "%";
      wind.textContent = "Wind: " + data.wind.speed + " km/h";
      feelsLike.textContent = "Feels like: " + Math.round(data.main.feels_like) + "°C";
      weatherIcon.style.display = "block";
      weatherIcon.src = "https://openweathermap.org/img/wn/" + data.weather[0].icon + "@2x.png";
    })
    .catch(error => {
      alert("City not found, please try again!");
    });
});

toggleBtn.addEventListener("click", function() {
  isCelsius = !isCelsius;

  if (isCelsius) {
    temperature.textContent = Math.round(currentTempC) + "°C";
    feelsLike.textContent = "Feels like: " + Math.round(currentFeelsLikeC) + "°C";
    toggleBtn.textContent = "Switch to °F";
  } else {
    const tempF = (currentTempC * 9/5) + 32;
    const feelsLikeF = (currentFeelsLikeC * 9/5) + 32;
    temperature.textContent = Math.round(tempF) + "°F";
    feelsLike.textContent = "Feels like: " + Math.round(feelsLikeF) + "°F";
    toggleBtn.textContent = "Switch to °C";
  }
});
