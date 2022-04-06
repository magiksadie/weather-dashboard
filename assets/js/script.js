var searchBtnEl = document.getElementById('searchBtn');

searchBtnEl.addEventListener('click', function(event) {
    event.preventDefault();
    var searchInputEl = document.getElementById('searchInput');
    var userInput = searchInputEl.value;
    fetchSearch(userInput);
});
function fetchSearch(city) {
    console.log(city);
    var cityAPI =`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=f67e4c0b75e73789ccfab3486194bd2f`;
    fetch(cityAPI).then(function(response) {
        return response.json()
    }).then(function(data) {
        console.log(data)
        var lat = data.coord.lat;
        var lon = data.coord.lon;
        fetchWeather(lat, lon);
    }).catch(function(error) {
        console.log(error)
    })
}
function fetchWeather(lat, lon) {
    var weatherAPI = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=f67e4c0b75e73789ccfab3486194bd2f`;
    fetch(weatherAPI).then(response => response.json()).then(function(data) {
        console.log(data)
    })
}
