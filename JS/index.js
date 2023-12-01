"use strict";

/* ----------------------------------------------------------------------------- */
/* Loader ---------------------------------------------------------------------- */
/* ----------------------------------------------------------------------------- */

window.addEventListener("load",function(){
   
  $("#loaderDiv").fadeOut(1000,function(){

    $("#myLoading").remove()

    $("body").css("overflow-y","auto")

  })

}) 

/* ----------------------------------------------------------------------------- */
/* Sharding -------------------------------------------------------------------- */
/* ----------------------------------------------------------------------------- */

function openLink(url){

  return   window.open(`https://${url}`,"_blank")
  
}

function getDayName(date = new Date(), locale = 'en-US') {
  return date.toLocaleDateString(locale, {weekday: 'long'});
}

let weekDays = ["Saturday","Sunday","Monday","Tuesday","Wednesday","Thursday","Friday"];

let theDayIndex = weekDays.indexOf(getDayName());

let theNextDayIndexCalc

let theNextAfterDayIndexCalc

function findNextDay(){

  let teNextDayIndex = theDayIndex+1

  if (teNextDayIndex >= weekDays.length) {

    theNextDayIndexCalc = teNextDayIndex -7
    
  }else{

    theNextDayIndexCalc = teNextDayIndex

  }

}

findNextDay()

let nextDay = weekDays[theNextDayIndexCalc]

console.log(nextDay);

function findAfterNextDay(){

  let teNextAfterDayIndex = theDayIndex+2

  if (teNextAfterDayIndex >= weekDays.length) {

    theNextAfterDayIndexCalc = teNextAfterDayIndex -7
    
  }else{

    theNextAfterDayIndexCalc = teNextAfterDayIndex

  }

}
findAfterNextDay()

let afterNextDay = weekDays[theNextAfterDayIndexCalc]

console.log(afterNextDay);


/* ----------------------------------------------------------------------------- */
/* ----------------------------------------------------------------------------- */
/* ----------------------------------------------------------------------------- */


async function getWeatherData(currentCity){

  if (!currentCity) {
    currentCity = 'Alexandria'
  }

  let apiResponse = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=cbeef6e5429845fa8a8153816220402&q=${currentCity}&days=3`)
  
  let responseData= await apiResponse.json()
  
  if (responseData.error){

    document.getElementById('warning').innerHTML = responseData.error.message

    document.getElementById('warning').classList.remove('d-none')

    return false

  }else{

    document.getElementById('warning').classList.add('d-none')

  };

  let cartona = 

  `
  <div class="col-md-12 col-xl-4 my-3 my-xl-0 overflow-hidden">

    <div  class="temp-card my-3 my-md-0 border border-2 border-info rounded-4 overflow-hidden">

        <div class="mainColor p-3 d-flex justify-content-between">

            <p class="fs-5 m-0">${getDayName()}</p>

            <p class="fs-5 m-0">${responseData.forecast.forecastday[0].date}</p>

        </div>

        <div class="p-4">

            <p id="lastUpdate" class="fs-5 my-3"><span class="text-info">Last Updated : </span>${responseData.current.last_updated}</p>

            <div class="d-flex justify-content-between align-items-center mb-5">

                <div>

                    <p class="fs-4 my-3"><span class="text-info"><i class="fa-solid fa-location-crosshairs me-2"></i> </span>${responseData.location.region}</p>

                    <p class="fs-4 my-3"><span class="text-info"><i class="fa-solid fa-location-dot me-2"></i> </span>${responseData.location.country}</p>

                </div>        

                <div class="d-flex flex-column align-items-center">

                    <img id="today-icon" width="100px" src="https:${responseData.current.condition.icon}" />

                    <p id="today-description" class="fs-3 fw-bold mb-0">${responseData.current.condition.text}</p>

                    <h2 class="fs-1 fw-bold mt-3 mb-0"><span id="today-degree">${responseData.current.temp_c}</span> <sup>o</sup>C</h2>

                </div>

            </div>



            <div class="d-flex justify-content-start align-items-center">

                <div class="pe-4 my-2 my-lg-0 d-flex align-items-center">

                    <i class="fa-solid fa-umbrella me-2 fs-2 text-info"></i>

                    <span id="wind" class="fs-5"> ${responseData.current.humidity}%</span>

                </div>

                <div class="pe-4 my-2 my-lg-0 d-flex align-items-center">

                    <i class="fa-solid fa-wind me-2 fs-3 text-info"></i>

                    <span id="wind" class="fs-5"> ${responseData.current.wind_kph} km/h</span>

                </div>

                <div class="pe-4 my-2 my-lg-0 d-flex align-items-center">

                    <i class="fa-regular fa-compass me-2 fs-2 text-info"></i>

                    <span id="wind" class="fs-5"> ${responseData.current.wind_dir}</span>

                </div>

            </div>

        </div>

    </div>

  </div>

  <!---------------------------------------------------------------------------------------------------------------------------->

  <div class="col-md-6 col-xl-4 my-3 my-xl-0 overflow-hidden">

    <div  class="temp-card my-3 my-md-0 border border-2 border-info rounded-4 overflow-hidden">

      <div class="mainColor p-3 d-flex justify-content-between">

        <p class="fs-5 m-0">${nextDay}</p>

        <p class="fs-5 m-0">${responseData.forecast.forecastday[1].date}</p>

      </div>

      <div class="p-4">

        <p id="lastUpdate" class="fs-5 my-3"><span class="text-info">Last Updated : </span>${responseData.current.last_updated}</p>

        <div class="d-flex justify-content-between align-items-center mb-5">

          <div>

            <p class="fs-5 my-3"><span class="text-info"><i class="fa-solid fa-location-crosshairs me-2"></i> </span>${responseData.location.region}</p>

            <p class="fs-4 my-3"><span class="text-info">MAX : </span>${responseData.forecast.forecastday[1].day.maxtemp_c} <sup>o</sup>C</p>

            <p class="fs-4 my-3"><span class="text-info">MIN : </span>${responseData.forecast.forecastday[1].day.mintemp_c} <sup>o</sup>C</p>

          </div>        

          <div class="d-flex flex-column align-items-center">

            <img id="today-icon" width="100px" src="https:${responseData.forecast.forecastday[1].day.condition.icon}" />

            <p id="today-description" class="fs-3 fw-bold mb-0">${responseData.forecast.forecastday[1].day.condition.text}</p>

          </div>

        </div>

        <div class="d-flex justify-content-start align-items-center">

          <div class="pe-4 my-2 my-lg-0 d-flex align-items-center">

            <p class="fs-5 text-info fw-bold m-0">MAXIMUM</p>

            <i class="fa-solid fa-wind mx-2 fs-3 text-info"></i>

            <span class="fs-5"> ${responseData.forecast.forecastday[1].day.maxwind_kph} km/h</span>

          </div>

        </div>

      </div>

    </div>

  </div>

  <!---------------------------------------------------------------------------------------------------------------------------->

  <div class="col-md-6 col-xl-4 my-3 my-xl-0 overflow-hidden">

    <div  class="temp-card my-3 my-md-0 border border-2 border-info rounded-4 overflow-hidden">

      <div class="mainColor p-3 d-flex justify-content-between">

        <p class="fs-5 m-0">${afterNextDay}</p>

        <p class="fs-5 m-0">${responseData.forecast.forecastday[2].date}</p>

      </div>

      <div class="p-4">

        <p id="lastUpdate" class="fs-5 my-3"><span class="text-info">Last Updated : </span>${responseData.current.last_updated}</p>

        <div class="d-flex justify-content-between align-items-center mb-5">

          <div>

            <p class="fs-5 my-3"><span class="text-info"><i class="fa-solid fa-location-crosshairs me-2"></i> </span>${responseData.location.region}</p>

            <p class="fs-4 my-3"><span class="text-info">MAX : </span>${responseData.forecast.forecastday[2].day.maxtemp_c} <sup>o</sup>C</p>

            <p class="fs-4 my-3"><span class="text-info">MIN : </span>${responseData.forecast.forecastday[2].day.mintemp_c} <sup>o</sup>C</p>

          </div>        

          <div class="d-flex flex-column align-items-center">

            <img id="today-icon" width="100px" src="https:${responseData.forecast.forecastday[2].day.condition.icon}" />

            <p id="today-description" class="fs-3 fw-bold mb-0">${responseData.forecast.forecastday[2].day.condition.text}</p>

          </div>

        </div>

        <div class="d-flex justify-content-start align-items-center">

          <div class="pe-4 my-2 my-lg-0 d-flex align-items-center">

            <p class="fs-5 text-info fw-bold m-0">MAXIMUM</p>

            <i class="fa-solid fa-wind mx-2 fs-3 text-info"></i>

            <span class="fs-5"> ${responseData.forecast.forecastday[2].day.maxwind_kph} km/h</span>

          </div>

        </div>

      </div>

    </div>

  </div>

  `
  
  document.getElementById("apiContent").innerHTML = cartona
  
}

getWeatherData();
