var searchBtnEl = document.getElementById('searchBtn');

searchBtnEl.addEventListener('click', function(event) {
    event.preventDefault();
    var searchInputEl = document.getElementById('searchInput');
    var userInput = searchInputEl.value;
    fetchSearch(userInput);
});
function fetchSearch(city) {
    var cityAPI =`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=f67e4c0b75e73789ccfab3486194bd2f`;
    fetch(cityAPI).then(function(response) {
        return response.json()
    }).then(function(data) {
        var lat = data.coord.lat;
        var lon = data.coord.lon;
        return fetchWeather(lat, lon);
    }).then(function(forecastWeather) {
        renderForecast(forecastWeather);
    }).catch(function(error) {
        console.log(error)
    })
}
async function fetchWeather(lat, lon) {
    var weatherAPI = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=imperial&exclude=minutely,hourly,alerts&appid=f67e4c0b75e73789ccfab3486194bd2f`;
    try {
        const response = await fetch(weatherAPI);
        const data = await response.json();
        var weather = data.current.weather;
        var humidity = data.current.humidity;
        console.log(weather, humidity);
        return data;
    } catch (error) {
        console.log(error);
    }
}
function renderForecast(forecastWeather) {
    var forecastEl = document.getElementById('forecast');
    forecastEl.innerHTML = forecastWeather;
    console.log(forecastWeather);
};