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
  document.querySelector("#city-name").innerHTML = response.data.name;
  document.querySelector("#temp-number").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#city-weather-description").innerHTML =
    response.data.weather[0].main;
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

  /*let apiUrl = "https://api.openweathermap.org/data/2.5/weather?";
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  axios
    .get(
      `${apiUrl}
      lat=${latitude}&lon=${longitude}
      &appid=${apiKey}
      &units=metric`
    )
    */
  axios.get(apiUrl).then(showCitySearch);
}

let currentLocationBtn = document.querySelector("#current-btn");
currentLocationBtn.addEventListener("click", getCurrentLocation);

/*
function showPosition(response) {
  let currentLocale = document.querySelector("#city-search");
  currentLocale.innerHTML = `${response.data.name}`;
  let currentTemp = Math.round(response.data.main.temp);
  let currentTempShow = document.querySelector("#temp-number");
  currentTempShow.innerHTML = `${currentTemp}`;
}
*/

////////////////////////////////////////////////////////////////////

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

let timeWeather = document.querySelector("#city-date");
timeWeather.innerHTML = formatDayTime(currentTime);

/*
// Week 4 Challenge 3 Bonus attempt

function convertToFarenheit(event) {
  event.preventDefault();

  let temperature = document.querySelector("#temp-number.value");

  let fTemp = Math.round((temperature * 9) / 5 + 32);

  let fConverted = document.querySelector("#temp-number");

  fConverted.innerHTML = `${fTemp}`;
}

function convertToCelcius(event) {
  event.preventDefault();

  let temperature = document.querySelector("#temp-number.value");

  let cTemp = Math.round(((temperature - 32) * 5) / 9);

  let cConverted = document.querySelector("#temp-number");

  cConverted.innerHTML = `${cTemp}`;
}

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
