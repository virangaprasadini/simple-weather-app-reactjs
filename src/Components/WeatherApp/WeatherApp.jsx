import React, { useState } from 'react';
import './WeatherApp.css';
import search_icon from '../Assests/search.png';
import cloud_icon from '../Assests/cloud.png';
import drizzle_icon from '../Assests/drizzle.png';
import rain_icon from '../Assests/rain.png';
import snow_icon from '../Assests/snow.png';
import clear_icon from '../Assests/clear.png';
import wind_icon from '../Assests/wind.png';
import humidity_icon from '../Assests/humidity.png';

const WeatherApp = () => {
    let api_key = "af8e95b86b3ad5aadc1f4adaa28ad698";

    const [wicon, setWicon] = useState(cloud_icon);

    const search = async () => {
        const element = document.getElementsByClassName("cityInput");
        if (element.length === 0 || element[0].value === "") {
            return 0;
        }

        let url = `https://api.openweathermap.org/data/2.5/weather?q=${element[0].value}&units=Metric&appid=${api_key}`;

        let data = {}; // Declare data variable with a default value

        try {
            let response = await fetch(url);
            data = await response.json();

            // Check if elements exist before updating their content
            const humidity = document.getElementsByClassName("humidity-percent");
            const wind = document.getElementsByClassName("wind-rate");
            const temperature = document.getElementsByClassName("weather-temp");
            const location = document.getElementsByClassName("weather-location");

            if (humidity.length > 0) humidity[0].innerHTML = data.main.humidity + "%";
            if (wind.length > 0) wind[0].innerHTML = Math.floor(data.wind.speed )+ "km/h";
            if (temperature.length > 0) temperature[0].innerHTML = Math.floor(data.main.temp) + "℃";
            if (location.length > 0) location[0].innerHTML = data.name;
        } catch (error) {
            console.error("Error fetching data:", error);
        }

        // Update weather icon based on weather condition
        if (data.weather && data.weather[0]) {
            const weatherCondition = data.weather[0].icon;

            switch (weatherCondition) {
                case "01d":
                case "01n":
                    setWicon(clear_icon);
                    break;
                case "02d":
                case "02n":
                    setWicon(cloud_icon);
                    break;
                case "03d":
                case "03n":
                case "04d":
                case "04n":
                    setWicon(drizzle_icon);
                    break;
                case "09d":
                case "09n":
                case "10d":
                case "10n":
                    setWicon(rain_icon);
                    break;
                case "13d":
                case "13n":
                    setWicon(snow_icon);
                    break;
                default:
                    setWicon(clear_icon);
                    break;
            }
        }
    };

    return (
        <div className='container'>
            <div className="top-bar">
                <input type="text" className="cityInput" placeholder='search' />
                <div className="search-icon" onClick={search}>
                    <img src={search_icon} alt="" />
                </div>
            </div>

            <div className="weather-image">
                <img src={wicon} alt="" />
            </div>
            <div className="weather-temp">24℃</div>
            <div className="weather-location">London</div>

            <div className="data-container">
                <div className="element">
                    <img src={humidity_icon} alt="" className='icon' />
                    <div className="data">
                        <div className="humidity-percent">64%</div>
                        <div className="text">Humidity</div>
                    </div>
                </div>
                <div className="element">
                    <img src={wind_icon} alt="" className='icon' />
                    <div className="data">
                        <div className="wind-rate">18 km/h</div>
                        <div className="text">Wind speed</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default WeatherApp;
