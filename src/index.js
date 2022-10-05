let currentTime = new Date();

function formatDayTime(date) {
  let now = new Date();

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

  let hour = now.getHours();
  if (hour < 10) {
    hour = `0${hour}`;
  }
  let minutes = now.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  let formattedDayTime = day + ", " + hour + ":" + minutes;
  return formattedDayTime;
}

// Used in forecast weather app bottom row
function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[day];
}

let timeWeather = document.querySelector("#city-date");
timeWeather.innerHTML = formatDayTime(currentTime);

// Week 8 Forecast, dynamic HTML

// Function to inject dynamic HTML into columns for 7 day forecast at app bottom
// Appends next "forecastDay" to previous days in the response array
// using foreach loop, imp. forecastHTML = forecastHTML + `...html...`
// Function called within getForecast function for openweather API data "response.data.coord"

function displayForecast(response) {
  let forecast = response.data.daily;

  let forecastElement = document.querySelector("#forecast");

  //let days = ["Mon", "Tues", "Weds", "Thur", "Fri", "Sat", "Sun"];

  let forecastHTML = `<div class = "row">`; //opens row of columns

  forecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        `
    <div class = "col-2">
      <div class = "weather-forecast-date">
          ${formatDay(forecastDay.dt)}</div>
      <img src = 
          "http://openweathermap.org/img/wn/${
            forecastDay.weather[0].icon
          }@2x.png"
          alt = ""
          width = "42" />
    
    <div class = "weather-forecast-temperatures">
      <span class = "weather-forecast-temperature-max">
      ${Math.round(forecastDay.temp.max)}°/</span>
      <span class = "weather-forecast-temperature-min"> 
      ${Math.round(forecastDay.temp.min)}°</span>
    
    </div>
  </div>
  `;
    }
  });
  // Closes column and injects HTML
  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

// Week 8 Forecast, Call to API
// only the OneCall API set from openweathermap.org contains the forecast data
// but no city name so forecast called from coordinates
// This function called from showCitySearch function (displaytemperature function)

function getForecast(coordinates) {
  let apiKey = "c6f8ef4575250284954db9f4dfa7a996";

  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(displayForecast);
}

// Week 5 Homework APIs

function handleSubmit(event) {
  event.preventDefault();
  let cityname = document.querySelector("#city-input").value;
  citySearch(cityname);
}

function citySearch(cityname) {
  let apiKey = "c6f8ef4575250284954db9f4dfa7a996";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityname}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showCitySearch);
}

function showCitySearch(response) {
  celciusTemperature = response.data.main.temp;

  document.querySelector("#city-name").innerHTML = response.data.name;
  document.querySelector("#temp-number").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#city-weather-description").innerHTML =
    response.data.weather[0].main;

  document.querySelector("#city-weather-humidity").innerHTML =
    response.data.main.humidity;

  document.querySelector("#city-weather-windspeed").innerHTML = Math.round(
    response.data.wind.speed
  );

  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);

  getForecast(response.data.coord);
}

let formCity = document.querySelector("#city-search-form");
formCity.addEventListener("submit", handleSubmit);

citySearch("New York");

///////////////////////////////////////////////////////////////////

function getCurrentLocation(event) {
  debugger;
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(axiosPosition);
}

function axiosPosition(position) {
  let apiKey = "c6f8ef4575250284954db9f4dfa7a996";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showCitySearch);
}

let currentLocationBtn = document.querySelector("#current-btn");
currentLocationBtn.addEventListener("click", getCurrentLocation);

////////////////////////////////////////////////////////////////////

// Week 4 Challenge 3 Bonus attempt

function convertToFarenheit(event) {
  event.preventDefault();

  //let ftemperature = response.data.main.temp;
  //let fTemp = Math.round((temperature * 9) / 5 + 32);
  let ftemperature = document.querySelector("#temp-number");
  let fTemp = celciusTemperature * 1.8 + 32;
  ftemperature.innerHTML = Math.round(fTemp);
}

function convertToCelcius(event) {
  event.preventDefault();
  //let cTemp = Math.round(((temperature - 32) * 5) / 9);
  //let cTemp = Math.round((ctemperature - 32) * 0.5556);
  //let cTemp = response.data.main.temp;
  let cConverted = document.querySelector("#temp-number");
  cConverted.innerHTML = Math.round(celciusTemperature);
}

let celciusTemperature = null;

let farenheitLink = document.querySelector("#farenheit-link");
farenheitLink.addEventListener("click", convertToFarenheit);

let celciusLink = document.querySelector("#celcius-link");
celciusLink.addEventListener("click", convertToCelcius);

/*

let weather = [
  {
    name: "Paris",
    temp: 19.7,T
    ftemp: 68,
    humidity: 80,
  },
  {
    name: "Tokyo",
    temp: 17.3,
    ftemp: 63,
    humidity: 50,
  },
  {
    name: "Lisbon",
    temp: 30.2,
    ftemp: 86,
    humidity: 20,
  },
  {
    name: "San Francisco",
    temp: 20.9,
    ftemp: 70,
    humidity: 100,
  },
  {
    name: "Oslo",
    temp: -5,
    ftemp: 23,
    humidity: 20,
  },
];


let city = prompt("Enter your city:");

switch (city) {
  case "Paris":
    alert(
      `It is currently ${Math.round(weather[0].temp)}°C (${
        weather[0].ftemp
      }°F) in ${weather[0].name} with a humidity of ${weather[0].humidity}%.`
    );
    break;

  case "Tokyo":
    alert(
      `It is currently ${Math.round(weather[1].temp)}°C (${
        weather[1].ftemp
      }°F) in ${weather[1].name} with a humidity of ${weather[1].humidity}%.`
    );
    break;

  case "Lisbon":
    alert(
      `It is currently ${Math.round(weather[2].temp)}°C (${
        weather[2].ftemp
      }°F) in ${weather[2].name} with a humidity of ${weather[2].humidity}%.`
    );
    break;

  case "San Francisco":
    alert(
      `It is currently ${Math.round(weather[3].temp)}°C (${
        weather[3].ftemp
      }°F) in ${weather[3].name} with a humidity of ${weather[3].humidity}%.`
    );
    break;

  case "Oslo":
    alert(
      `It is currently ${Math.round(weather[4].temp)}°C (${
        weather[4].ftemp
      }°F) in ${weather[4].name} with a humidity of ${weather[4].humidity}%.`
    );
    break;

  default:
    alert(
      `Sorry, we don't know the weather for this city, try going to https://www.google.com/`
    );
}*/
