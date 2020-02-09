const COORDS = "coords";
const API_KEY = "4d99de3077ebe0a33771e98a7e48afaf";

const weather = document.querySelector(".js-weather");

function getWeather(lat, lon) {
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
  )
    .then(function(respone) {
      return respone.json();
    })
    .then(function(json) {
      const temp = json.main.temp;
      const place = json.name;
      weather.innerText = `${temp} @ ${place}`;
    });
}

function saveCoords(coordsObj) {
  localStorage.setItem(COORDS, JSON.stringify(coordsObj));
}

function handleGeoSucces(position) {
  const latitude = position.coords.latitude;
  const longitude = position.coords.longitude;
  const coordsObj = {
    latitude,
    longitude
  };
  saveCoords(coordsObj);
  getWeather(latitude, longitude);
}

function handleGeoError() {
  console.log("no");
}

function askForCoords() {
  navigator.geolocation.getCurrentPosition(handleGeoSucces, handleGeoError);
}

function loadCoords() {
  const loadedCoodrds = localStorage.getItem(COORDS);
  if (loadedCoodrds === null) {
    askForCoords();
  } else {
    const parseCoords = JSON.parse(loadedCoodrds);
    getWeather(parseCoords.latitude, parseCoords.longitude);
  }
}

function init() {
  loadCoords();
}

init();
