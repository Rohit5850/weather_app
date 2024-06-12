import React from "react";

const WeatherData = (props)=>{

    return(
        <div className="weatherDataShow">
                             <div className="data_city">
                                       <h1>{props.cityName} , <span>{props.countryName}</span></h1>
                              </div>
                              <div className="data_date">
                                    <p>{props.currDate}</p>
                              </div>
                              <div className="data_temp">
                                <img src={`https://openweathermap.org/img/wn/${props.weatherImg}@2x.png`} alt={props.weatherImgAlt}/>
                                <p>{props.temp}<sup className="deg">°C</sup></p>
                              </div>
                              <div className="data_windSpeed">
                                     <p className="weatherDesp">{props.weatherDesp}</p>
                                     <p className="weatherSpeed">Wind Speed {props.weatherSpeed} m/s</p>
                              </div>

        </div>
    )
}

export default WeatherData;