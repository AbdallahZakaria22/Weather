let searchinput=document.getElementById("search");

let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
let month = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];


async function getCountry(country){
    let request =await fetch( `https://api.weatherapi.com/v1/forecast.json?key=2ae1629a196f43378b6145739232302&q=${country}&days=3`);
    let response=await request.json();
    displayToday(response.location,response.current);
    displayRest(response.forecast.forecastday)
}

searchinput.addEventListener("input",function(info){
    getCountry(info.target.value);
});


function displayToday(location,current){
      let dateNow = new Date(current.last_updated);

    let outPut = ` <div class="today forecast">
                <div id="today" class="forecast-header">
                    <div class="day">${days[dateNow.getDay()]}</div>
                    <div class="date">${dateNow.getDate()+month[dateNow.getMonth()]}</div>
                </div>
                <div id="current" class="forecast-content">
                    <div class="location">${location.name}</div>
                    <div class="degree">
                        <div class="num">
                            ${current.temp_c}
                            <sup>o</sup>
                            C
                        </div>
                        <div class="forecast-icon">
                        <img src="https:${current.condition.icon}" width="90" alt="">
                    </div>
                    </div>
                    <div class="custom">${current.condition.text}</div>
                    <span><img src="./images/icon-umberella.png" alt="">
                    20%</span>
                    <span><img src="./images/icon-wind.png" alt="">
                    18km/h</span>
                    <span><img src="./images/icon-compass.png" alt="">
                        East
                    </span>
                </div>
            </div>`;
            document.getElementById("forecast").innerHTML=outPut;
}

function displayRest(forecast){
    let outPut2="";
    for(let i=1;i<forecast.length;i++){
        outPut2 += `
                    <div class="forecast">
                <div class="forecast-header">
                    <div class="day">${days[new Date(forecast[i].date).getDay()]}
                      </div>
                </div>
                <div class="forecast-content">
                    <div class="forecast-icon">
                        <img src="https:${
                          forecast[i].day.condition.icon
                        }" width="48" alt="">
                    </div>
                    <div class="degree">
                        ${forecast[i].day.maxtemp_c}
                        <sup>o</sup>
                        C
                    </div>
                    <small> ${forecast[i].day.mintemp_c}
                        <sup>o</sup>
                    </small>
                    <div class="custom">${forecast[i].day.condition.text}</div>
                </div>
            </div>
        `;
    }
 document.getElementById("forecast").innerHTML += outPut2;
}


getCountry("cairo")

