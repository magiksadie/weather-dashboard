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
        $('#forecast').empty();
        for (var i = 1; i < 6; i++) {
            var forecastDay = forecastWeather.daily[i];
            renderForecastDay(forecastDay);
        }
    }).catch(function(error) {
        console.log(error)
    })
}
async function fetchWeather(lat, lon) {
    var weatherAPI = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=imperial&exclude=minutely,hourly,alerts&appid=f67e4c0b75e73789ccfab3486194bd2f`;
    try {
        const response = await fetch(weatherAPI);
        const data = await response.json();
        return data;
    } catch (error) {
        console.log(error);
    }
}
function renderForecast(forecastWeather) {
    var forecastEl = document.getElementById('current');
    forecastEl.innerHTML = 'Current Weather ' + '</br>' + 'Forecast: ' + forecastWeather.current.weather[0].description + `<img src="http://openweathermap.org/img/wn/${forecastWeather.current.weather[0].icon}@2x.png"/>` + '</br>' + 'Temperature: ' + forecastWeather.current.temp + '&#8457;' + '</br>' + 'Humidity: ' + forecastWeather.current.humidity + '%' + '</br>' + 'Wind Speed: ' + forecastWeather.current.wind_speed + 'mph' + '</br>' + 'UV Index: ' + forecastWeather.current.uvi + '</br>';
    console.log(forecastWeather);
};
function renderForecastDay(forecastDay) {
    var forecastEl = document.getElementById('forecast');
    var daily = moment(new Date(forecastDay.dt * 1000)).format('ll');
    let dayHTML = daily + '</br>' + 'Forecast: ' + forecastDay.weather[0].description + `<img src="http://openweathermap.org/img/wn/${forecastDay.weather[0].icon}@2x.png"/>` + '</br>' + 'Temperature: ' + forecastDay.temp.day + '&#8457;' + '</br>' + ' High Temp: ' + forecastDay.temp.max + '&#8457;' + '</br>' + 'Low Temp: ' + forecastDay.temp.min + '&#8457;' + '</br>' +  'Humidity: ' + forecastDay.humidity + '%' + '</br>' + 'Wind Speed: ' + forecastDay.wind_speed + 'mph' + '</br>' + 'UV Index: ' + forecastDay.uvi + '</br>';
    forecastEl.appendChild(document.createElement('div')).innerHTML = dayHTML;
}
