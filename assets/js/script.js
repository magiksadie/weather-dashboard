var searchBtnEl = document.getElementById('searchBtn');

searchBtnEl.addEventListener('click', function() {
    var searchInputEl = document.getElementById('searchInput');
    var userInput = searchInputEl.value;
    fetchSearch(userInput);
});
function fetchSearch(city) {
    var cityAPI ='https://api.openweathermap.org/data/2.5/weather?q=' + city + '&appid=f67e4c0b75e73789ccfab3486194bd2f';
    fetch(cityAPI).then(function(response) {
        return response.json()
    }).then(function(data) {
        console.log(data)
        //pull lat and long from data data.lan
    }).catch(function(error) {
        console.log(error)
    })
}
var weatherAPI = 'https://api.openweathermap.org/data/2.5/onecall?lat={lat}&lon={lon}&exclude={part}&appid=f67e4c0b75e73789ccfab3486194bd2f';
