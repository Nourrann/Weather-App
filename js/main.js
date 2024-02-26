document.addEventListener("DOMContentLoaded", function () {
  // today data
  let todayName = document.getElementById("todayName");
  let todayNumber = document.getElementById("todayNum");
  let todayMonth = document.getElementById("todayMonth");
  let todayLocation = document.getElementById("location");
  let todayTemp = document.getElementById("numm");
  let todayTempImg = document.getElementById("forecastIcon");
  let todayConditionText = document.getElementById("custom");
  let todayHumidity = document.getElementById("humidity");
  let todayWind = document.getElementById("wind");
  let todayWindDir = document.getElementById("windDir");

  //& next data
  let nextDay = document.getElementsByClassName("nextDay");
  let nextMaxTemp = document.getElementsByClassName("nextMax");
  let nextMinTemp = document.getElementsByClassName("nextMin");
  let nextTempImg = document.getElementsByClassName("nextForecastIcon");
  let nextConditionText = document.getElementsByClassName("nextCustom");

  //* search input
  let searchInput = document.getElementById("search");

  // function to fetch API data
  async function getWeatherData(cityName) {
    let weatherResponse = await fetch(
      `https://api.weatherapi.com/v1/forecast.json?key=f43577fd59804203ad0183509242602&q=${cityName}&days=3`
    );
    let weatherData = await weatherResponse.json();
    return weatherData;
  }

  //^ display today's data
  function displayTodayData(data) {
    let todayDate = new Date();
    todayName.innerHTML = todayDate.toLocaleDateString("en-US", {
      weekday: "long",
    });
    todayNumber.innerHTML = todayDate.getDate();
    todayMonth.innerHTML = todayDate.toLocaleDateString("en-US", {
      month: "long",
    });
    todayLocation.innerHTML = data.location.name;
    todayTemp.innerHTML = data.current.temp_c;
    todayTempImg.setAttribute("src", data.current.condition.icon);
    todayConditionText.innerHTML = data.current.condition.text;
    todayHumidity.innerHTML = data.current.humidity + "%";
    todayWind.innerHTML = data.current.wind_kph + "km/h";
    todayWindDir.innerHTML = data.current.wind_dir;
  }

  //& display next 2 days data
  function displayNextData(data) {
    let forecastData = data.forecast.forecastday;
    for (let i = 0; i < 2; i++) {
      let nextDate = new Date(forecastData[i + 1].date);
      nextDay[i].innerHTML = nextDate.toLocaleDateString("en-US", {
        weekday: "long",
      });
      nextMaxTemp[i].innerHTML = forecastData[i + 1].day.maxtemp_c;
      nextMinTemp[i].innerHTML = forecastData[i + 1].day.mintemp_c;
      nextTempImg[i].setAttribute(
        "src",
        forecastData[i + 1].day.condition.icon
      );
      nextConditionText[i].innerHTML = forecastData[i + 1].day.condition.text;
    }
  }

  // weather app function to call all of the other functions
  async function weatherApp(city = "cairo") {
    let weatherData = await getWeatherData(city);
    console.log(weatherData);
    displayTodayData(weatherData);
    displayNextData(weatherData);
  }
  weatherApp();
  searchInput.addEventListener("input", function () {
    weatherApp(searchInput.value);
  });
});
