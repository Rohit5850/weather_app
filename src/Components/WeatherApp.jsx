import React, { useState } from "react";
import Loader from "react-js-loader";
import './WeatherApp.css'
import axios from "axios";
import WeatherData from "./WeaterData";
import { FaFaceFrown } from "react-icons/fa6";

const WeatherApp = ()=>{

    const [cityName,setCityName] = useState('')
    const [weather,setWeather] = useState({loading: false, data: {}, error: false,})

    const toDateFun = ()=>{
       
        const month = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

        const day = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday',  'Friday', 'Saturday' ];

        let curentDate = new Date();

        const date = `${day[curentDate.getDay()]} ${curentDate.getDate()} ${month[curentDate.getMonth()]}`;

        console.log(curentDate)

        return date

    }

    const search = async (event)=>{

        if( event.key === 'Enter'){
            toDateFun()
            event.preventDefault();
            setCityName('')

            setWeather({ ...weather, loading: true });
            
            const url = 'https://api.openweathermap.org/data/2.5/weather'
            const apiKey = '4f6da53ea44b72a16cbc9682f48678d3'

            await axios 
            .get(url , {
                params:{
                    q:cityName,
                    units:'metric',
                    appid:apiKey,
                },
            })

            .then((res)=>{
                setWeather({ data: res.data, loading: false, error: false });
                
            })
            .catch((error)=>{
                setWeather({ ...weather, data: {}, error: true });
                
                
            })

            
        }
    }


    return(

        <div className="weather_app">
               <div className="app_heading"> <h2>Weather App</h2></div>


               <div className="app_content">
                    <div className="input_city">
                      <input type="text" value={cityName} placeholder="Enter City Name" onChange={(e)=>setCityName(e.target.value)} 
                      onKeyPress = {search}/>
                    </div>
                    {
                        weather.loading &&(
                            <Loader type="spinner-cub" bgColor={'#FF0000'} color={'#FFFFFF'}  size={100} />
                        )
                    }
                    {
                        weather.error && (
                         <>
                         <div className="error_found">
                         <FaFaceFrown/>
                         <span style={{ fontSize: '20px' }}>City not found</span>
                            </div>
                         </>

                        )
                        
                    }
                    <div className="weather_data">
                    {weather && weather.data && weather.data.main && (

                            <WeatherData cityName={weather.data.name} countryName={weather.data.sys.country} temp={weather.data.main.temp} weatherDesp={weather.data.weather[0].description.toUpperCase()} weatherSpeed={ weather.data.wind.speed} weatherImg={weather.data.weather[0].icon} weatherImgAlt={weather.data.weather[0].description} currDate={toDateFun()}/>

                    )}
                         
                    </div>
               </div>
        </div>
    )
}


export default WeatherApp;