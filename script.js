const API_KEY = "API_KEY";

const URL = (city) =>
  `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`;

const body = document.body;
const search_conatiner = document.querySelector(".search_conatiner");
const searchText = document.querySelector(
  ".search_conatiner input[type='text']"
);
const displayInfo = document.querySelector(".info");
const weatherInfo = document.querySelector(".weatherInfo");
const iconImg = document.querySelector("img");
const city_name = document.querySelector(".city_name"); // city selector
const temp_desc = document.querySelector(".temp_desc"); // temp selector
const wind_desc = document.querySelector(".wind_desc"); // wind selector

search_conatiner.addEventListener("submit", (e) => {
  e.preventDefault();
  const current_url = URL(searchText.value);
  searchText.value = "";

  getInfo(current_url);
});

async function getInfo(current_url) {
  const response = await fetch(current_url);
  if (response.ok) {
    //data
    const data = await response.json();

    // city
    const cityName = data.name;

    // temperature
    const temperature = data.main.temp;
    const temp_celsius = Math.ceil(temperature - 273.15);

    // wind
    const wind = data.wind.speed;
    const wind_speed = Math.ceil(wind * (18 / 5));

    // description
    const weather = data.weather;
    const description = weather[0].description;

    // icon
    const icon = weather[0].icon;

    addInfo(cityName, description, temp_celsius, wind_speed);
    getIcon(icon);
  } else {
    throw new Error("Something went wrong");
  }
}
async function getIcon(iconCode) {
  const iconResponse = await fetch(
    `http://openweathermap.org/img/wn/${iconCode}@2x.png`
  );
  iconImg.src = iconResponse.url;
}

function addInfo(city, description, temp, wind) {
  weatherInfo.textContent = description;
  city_name.textContent = city;
  temp_desc.textContent = `${temp}° Celsius`;
  wind_desc.textContent = `${wind} km/h`;
}
