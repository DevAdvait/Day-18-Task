//restcountries api url for fetch
let restCountUrl = "https://restcountries.com/v3.1/all";
//openweather api key
let openWeathApiKey = "0f05632401cf9e9fc68ffff7ccee9e43";

//fetch countries data.
fetch(restCountUrl)
  .then((res) => res.json())
  .then((data) => {
    for (let i = 0; i < 15; i++) {
      //National Data Card
      var natData = document.createElement("div");
      natData.className = "col col-sm-12 col-lg-4  card mx-2 my-2";
      natData.innerHTML = `
          <div class="card-body" id="${data[i].name.common}-body">
            <h5 class="card-header">${data[i].name.common}</h5>
            <div class="img-wrapper">
                <img src=${
                  data[i].flags.svg
                } alt="" class="img-fluid country-flag">
            </div>
            <h6 class="country-details capital">Capital : ${
              data[i].capital
            }</h6>
            <h6 class="country-details latLng">Latitude : ${data[
              i
            ].latlng[0].toFixed(2)}\nLongitude: ${data[i].latlng[1].toFixed(
        2
      )}</h6>
            <h6 class="country-details region">Region : ${data[i].region}</h6>
            <h6 class="country-details country-codes">Country-codes : ${
              data[i].cca3
            }</h6>
            <div class="button-div" id="${data[i].name.common}-button-div">
              <button type="button" class="btn btn-primary" onclick="weatherButton(this.value)" id ="${
                data[i].name.common
              }-weathButton" value="${
        data[i].name.common
      }">Click for weather</button>
            </div>
          </div>`;

      var cardCont = document.getElementById("cardContainer");
      cardCont.appendChild(natData);
    }
  })
  .catch((error) => console.log(error));




var weatherFetched = false;


//get Weather Data on button click.
function weatherButton(countName) {
  let openWeathCountName = `https://api.openweathermap.org/data/2.5/weather?q=${countName}&appid=${openWeathApiKey}`;
  // condition to check if weather data if displayed
  if (weatherFetched === false) {
    fetch(openWeathCountName)
      .then((res) => res.json())
      .then((data) => {
        var weatherData = document.createElement("div");
        weatherData.className = `${countName}-weather`;
        weatherData.setAttribute("id", `${countName}-weather`);
        weatherData.innerHTML = `
        <h6 class="country-weather-description region">Description : ${data.weather[0].description}</h6>
        <h6 class="country-current-temp region">Current Temperature : ${data.main.temp}</h6>`;
        var cardBody = document.getElementById(`${countName}-body`);
        cardBody.appendChild(weatherData);

        var cardButton = document.getElementById(`${countName}-weathButton`);
        cardButton.textContent = "Reset Weather";
        weatherFetched = true;
        console.log(`weather fetched = ${weatherFetched}`);
      });
  }
  // condition to hide weather data 
  if (weatherFetched === true) {
    var getWeathDiv = document.getElementById(`${countName}-weather`);
    getWeathDiv.innerHTML = "";
    var cardButton = document.getElementById(`${countName}-weathButton`);
    cardButton.textContent = "Click for Weather";
    weatherFetched = false;
    console.log(`weather fetched = ${weatherFetched}`);
  }
}
